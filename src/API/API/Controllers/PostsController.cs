using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using API.Models;

namespace API.Controllers
{
    [Route("api")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        // GET: api/Posts?type
        [Route("Posts")]
        [HttpGet]
        public string Get(string type = "all", string site = "both", string sort = "score", bool asc = false)
        {
            return $"{type}, {site}, {sort}, {asc}";
        }
    }
}
