using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using API.Models;
using System.Net;
using System.Text.Json;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Parameters;

namespace API.Controllers
{
    [Route("api/Posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly TwitterClient userClient = new TwitterClient(Environment.GetEnvironmentVariable("CONSUMERKEY").Trim('\"'), Environment.GetEnvironmentVariable("CONSUMERSECRET").Trim('\"'), Environment.GetEnvironmentVariable("ACCESSTOKEN").Trim('\"'), Environment.GetEnvironmentVariable("ACCESSTOKENSECRET").Trim('\"'));

        // GET: api/Posts?{q?}&{type?}&{limit?}&{sort?}&{reverse?}&{site?}
        [HttpGet]
        [Produces("application/json")]
        public async Task<Post[]> Get(string query = "cats", int limit = 10, string type = "all", string site = "both", string sort = "score", bool reverse = false)
        {
            query = System.Web.HttpUtility.UrlEncode(query);
            query = query.Replace('_', ' ');
            Post[] finalResult = null;
            if(site.Equals("both"))
            {
                Post[][] results = await Task.WhenAll(redditHandler(query, limit, type, sort, reverse), twitterHandler(query, limit, type, sort, reverse));
                finalResult = results[0].Concat(results[1]).ToArray();
                if(sort.Equals("score"))
                {
                    Array.Sort(finalResult, delegate (Post Post1, Post Post2)
                    {
                        return Post2.score.CompareTo(Post1.score);
                    });
                }
                else
                {
                    Array.Sort(finalResult, delegate (Post Post1, Post Post2)
                    {
                        return Post1.date.CompareTo(Post2.date);
                    });
                }
                
            }
            else if(site.Equals("twitter"))
            {
                finalResult = await twitterHandler(query, limit, type, sort, reverse);
                if(sort.Equals("score"))
                {
                    Array.Sort(finalResult, delegate (Post Post1, Post Post2)
                    {
                        return Post2.score.CompareTo(Post1.score);
                    });
                }
                else
                {
                    Array.Sort(finalResult, delegate (Post Post1, Post Post2)
                    {
                        return Post1.date.CompareTo(Post2.date);
                    });
                }
                
            }
            else
            {
                finalResult = await redditHandler(query, limit, type, sort, reverse);
                if (sort.Equals("score"))
                {
                    Array.Sort(finalResult, delegate (Post Post1, Post Post2)
                    {
                        return Post2.score.CompareTo(Post1.score);
                    });
                }
                else
                {
                    Array.Sort(finalResult, delegate (Post Post1, Post Post2)
                    {
                        return Post1.date.CompareTo(Post2.date);
                    });
                }
                
            }

            if(reverse)
            {
                Array.Reverse(finalResult);
            } 
            if(type.Equals("text"))
            {
                finalResult = finalResult.Where(post => post.postType.Equals("text")).ToArray();
            }
            else if(type.Equals("other"))
            {
                finalResult = finalResult.Where(post => post.postType.Equals("other")).ToArray();
            }
            return finalResult.Take(limit).ToArray();
        }
        private async Task<Post[]> twitterHandler(string query, int limit, string type, string sort, bool reverse)
        {
            SearchResultType searchType = SearchResultType.Popular;
            if (!sort.Equals("score"))
            {
                searchType = SearchResultType.Recent;
            }

            var searchParameters = new SearchTweetsParameters(query)
            {
                Lang = LanguageFilter.English,
                SearchType = searchType,
            };

            var searchResponse = await userClient.Search.SearchTweetsAsync(searchParameters);
            Post[] result = new Post[searchResponse.Length];
            int i = 0;
            foreach(ITweet tweet in searchResponse)
            {
                string sourceURL = tweet.Url;
                int score = tweet.FavoriteCount;
                string author = tweet.CreatedBy.Name;
                string sourceSite = "twitter";
                long date = tweet.CreatedAt.ToUnixTimeSeconds();
                string postType = "text";
                string previewMediaURL = null;
                if(tweet.Media.Count > 0)
                {
                    postType = "other";
                    previewMediaURL = tweet.Media[0].MediaURL;
                }
                result[i] = new Post(sourceURL: sourceURL, query: query, score: score, author: author, sourceSite: sourceSite, date: date, postType: postType, previewMediaURL: previewMediaURL);
                i++;
            }
            return result;
        }
        private async Task<Post[]> redditHandler(string query, int limit, string type, string sort, bool reverse)
        {
            HttpClient redditClient = new HttpClient();
            redditClient.BaseAddress = new Uri("https://reddit.com");
            string responseBody = await redditClient.GetStringAsync($"/search.json?q={query}&sort={(sort.Equals("score") ? "top" : "new")}&limit={limit}");
            JsonDocument responseBodyJSON = JsonDocument.Parse(responseBody);
            var responseDataEnumerator = responseBodyJSON.RootElement.GetProperty("data").GetProperty("children").EnumerateArray();
            Post[] result = new Post[responseDataEnumerator.Count()];
            int i = 0;
            while (responseDataEnumerator.MoveNext())
            {

                var responseData = responseDataEnumerator.Current.GetProperty("data");
                string sourceURL = redditClient.BaseAddress.ToString().Trim('/') + responseData.GetProperty("permalink").GetString();
                string text = responseData.GetProperty("title").GetString();
                int score = responseData.GetProperty("ups").GetInt32();
                string author = responseData.GetProperty("author").GetString();
                string sourceSite = "reddit";
                long date = Convert.ToInt64(responseData.GetProperty("created_utc").GetDouble());
                string postType = "text";
                try
                {
                    postType = responseData.GetProperty("is_self").GetBoolean() ? "text" : "other";
                }
                catch (KeyNotFoundException e)
                {
                    postType = "other";
                }
                string subreddit = responseData.GetProperty("subreddit_name_prefixed").GetString();
                string previewMediaURL = "";
                if(!postType.Equals("text"))
                {
                    try
                    {
                        previewMediaURL = responseData.GetProperty("url").GetString();
                    }
                    catch (KeyNotFoundException e)
                    {
                        previewMediaURL = "self";
                    }
                }
                result[i] = new Post(sourceURL: sourceURL, query: query, text: text, score: score, author: author, sourceSite: sourceSite, date: date, postType: postType, subreddit: subreddit, previewMediaURL: previewMediaURL);
                i++;
            }
            return result;
        }

    }
}
