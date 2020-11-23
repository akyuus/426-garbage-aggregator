using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Text.Json;
using System.Net.Http;
using System.Web;

namespace API.Controllers
{
    [Route("api/ApplicationUsers")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly ApplicationUserContext _context;

        public ApplicationUsersController(ApplicationUserContext context)
        {
            _context = context;
        }


        // GET: api/ApplicationUsers/5
        [HttpGet("{id}")]
        public async Task<Preferences> GetApplicationUser(int id)
        {
            var applicationUser = await _context.ApplicationUsers.FindAsync(id);
            string cookieValue;
            if (applicationUser == null)
            {
                return null;
            }

            try
            {
                Request.Cookies.TryGetValue("user_id", out cookieValue);
                if(Convert.ToInt32(cookieValue) != applicationUser.Id)
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }

            return new Preferences(applicationUser.sortPref, applicationUser.typePref, applicationUser.sitePref, applicationUser.reversePref);
        }

        [Route("login")]
        [HttpPost]
        public async Task<Preferences> Login([FromBody] object content)
        {
            JsonDocument data = JsonDocument.Parse(content.ToString());
            string username = "";
            string password = "";
            try
            {
                username = data.RootElement.GetProperty("username").GetString();
                password = data.RootElement.GetProperty("password").GetString();
            }
            catch(KeyNotFoundException)
            {
                return null;
            }
            var user = _context.ApplicationUsers.Where(u => u.username.Equals(username));
            ApplicationUser applicationUser = null;
            if (user.Count() > 0)
            {
                applicationUser = user.FirstOrDefault();
            }
            else
            {
                Preferences result = new Preferences("FAILED HERE 1", "", "", false);
                return null;
            }

            if(SecurePasswordHasher.Verify(password, applicationUser.password))
            {
                var options = new CookieOptions
                {
                    Expires = DateTime.Now.AddHours(1)
                };
                Response.Cookies.Append("user_id", Convert.ToString(applicationUser.Id), options);
                Preferences result = new Preferences(applicationUser.sortPref, applicationUser.typePref, applicationUser.sitePref, applicationUser.reversePref, applicationUser.Id);
                return result;
            }
            else
            {
                Preferences result = new Preferences("FAILED HERE 2", "", "", false);
                return null;
            }
        }

        // PUT: api/ApplicationUsers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPreferences(int id, ApplicationUser applicationUser)
        {
            var userList = _context.ApplicationUsers.Where(u => u.username.Equals(applicationUser.username) && u.Id == id);
            if(!(userList.Count() > 0) || !SecurePasswordHasher.Verify(applicationUser.password, userList.FirstOrDefault().password))
            {
                return BadRequest();
            }

            var user = userList.FirstOrDefault();
            user.sitePref = applicationUser.sitePref;
            user.reversePref = applicationUser.reversePref;
            user.typePref = applicationUser.typePref;
            user.sortPref = applicationUser.sortPref;
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ApplicationUsers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("register")]
        [HttpPost]
        public async Task<Preferences> Register(ApplicationUser applicationUser)
        {
            applicationUser.password = SecurePasswordHasher.Hash(applicationUser.password);
            var newUser = _context.ApplicationUsers.Add(applicationUser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                return null;
            }
            var options = new CookieOptions
            {
                Expires = DateTime.Now.AddHours(1)
            };
            Response.Cookies.Append("user_id", Convert.ToString(newUser.Entity.Id), options);
            var newUserPreferences = new Preferences(newUser.Entity.sortPref, newUser.Entity.typePref, newUser.Entity.sitePref, newUser.Entity.reversePref);
            return newUserPreferences;
        }

        // DELETE: api/ApplicationUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApplicationUser>> DeleteApplicationUser(int id, ApplicationUser currentUser)
        {
            string cookieValue;
            try
            {
                Request.Cookies.TryGetValue("user_id", out cookieValue);
                if (Convert.ToInt32(cookieValue) != id)
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }

            var applicationUser = await _context.ApplicationUsers.FindAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }

            if(!SecurePasswordHasher.Verify(currentUser.password, applicationUser.password))
            {
                return Unauthorized();
            }

            _context.ApplicationUsers.Remove(applicationUser);
            await _context.SaveChangesAsync();
            Response.Cookies.Delete("user_id");
            return applicationUser;
        }

        private bool ApplicationUserExists(int id)
        {
            return _context.ApplicationUsers.Any(e => e.Id == id);
        }
    }
}
