using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string sortPref { get; set; }
        public string typePref { get; set; }
        public string sitePref { get; set; }
        public bool reversePref { get; set; }
    }
}
