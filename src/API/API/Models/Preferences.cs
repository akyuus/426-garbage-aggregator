﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Preferences
    {
        public string sortPref { get; set; }
        public string typePref { get; set; }
        public string sitePref { get; set; }
        public bool reversePref { get; set; }

        public Preferences(string sortPref, string typePref, string sitePref, bool reversePref)
        {
            this.sortPref = sortPref;
            this.typePref = typePref;
            this.sitePref = sitePref;
            this.reversePref = reversePref;
        }
    }
}
