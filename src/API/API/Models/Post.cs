using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Post
    {
        public string sourceURL { get; set; }
        public string text { get; set; }
        public int score { get; set; }
        public DateTime date { get; set; }
        public string author { get; set; }
        public string source { get; set; } //reddit or twitter
        public string type { get; set; } //text or image (if a post contains an image it will default to image)
        public string[] mediaURLs { get; set; }
        public Post(string sourceURL, int score, string author, string source, DateTime date, string type, string text = "", string[] mediaURLs = null)
        {
            this.sourceURL = sourceURL;
            this.text = text;
            this.score = score;
            this.date = date;
            this.author = author;
            this.source = source;
            this.type = type;
            this.mediaURLs = mediaURLs;
        }
    }
}
