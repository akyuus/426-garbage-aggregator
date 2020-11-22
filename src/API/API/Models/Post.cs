using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Post
    {
        public string sourceURL { get; set; }
        public string query { get; set; } //original search term
        public string text { get; set; } //title if its a reddit post, tweet if its a tweet
        public int score { get; set; }
        public long date { get; set; } //unix time long
        public string author { get; set; }
        public string sourceSite { get; set; } //reddit or twitter
        public string subreddit { get; set; } //if reddit
        public string postType { get; set; } //text or other (if a post contains an image and text it will default to other)
        public string previewMediaURL { get; set; }
        public Post(string sourceURL, string query, int score, string author, string sourceSite, long date, string postType, string subreddit = "", string text = "", string previewMediaURL = null)
        {
            this.sourceURL = sourceURL;
            this.query = query;
            this.text = text;
            this.score = score;
            this.date = date;
            this.author = author;
            this.sourceSite = sourceSite;
            this.postType = postType;
            this.previewMediaURL = previewMediaURL;
            this.subreddit = subreddit;
        }
    }
}
