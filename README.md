# The Garbage Aggregator 

This is an application that lets you query both Reddit and Twitter and access the results. The url for the site is https://426garbageaggregator.azurewebsites.net/.

# API Documentation

## 1) Resources

Posts have the following properties:
```
attribute       |  type  |  description
-----------------------------------------------------------
sourceURL       | string | The url of the post.
query           | string | The search query used to find this.
text            | string | The title of the post (if from Reddit) or the tweet text, if there is any.
score           | int    | The score of the post (reddit upvotes, likes + retweets on twitter).
date            | long   | The date of the post in UNIX time.
author          | string | The person who posted this.
sourceSite      | string | One of "reddit" or "twitter".
subreddit       | string | The subreddit, if from reddit. Otherwise is an empty string.
postType        | string | One of "text" or "other".
previewMediaURL | string | If media is found in the post, this is the URL of the first one found. Could be a link, or an image. 

```

Preference objects have these properties:
```
attribute       |  type  |  description
-----------------------------------------------------------
id              | id     | The id of the associated user.
sortPref        | string | The sort preference of the associated user ("score" or "new").
typePref        | string | The type preference of the associated user ("text","other", or "all").
sitePref        | string | The site preference of the associated user ("reddit", "twitter", or "both").
reversePref     | bool   | The reverse preference of the associated user (true or false). 
```
## 2) Getting Posts

```
Endpoint: GET https://garbageapiprototype.azurewebsites.net/api/Posts
```
Parameters:
  1) query (string) - Optional. The keyword to search for. Defaults to "cats".
  2) limit (int) - Optional. The number of posts to return. Defaults to 10.
  3) type (string) - Optional. Must be one of "text", "other" or "all". Determines what kind of posts to return (if something contains anything other than text, it becomes                            "other"). Defaults to "all".
  4) site (string) - Optional. Must be one of "reddit", "twitter", or "both". Determines what site to get posts from. Defaults to "both".
  5) reverse (boolean) - Optional. Reverses the output if true. Defaults to false.

Response: Responds with an array of **Post** objects.

Example Axios Request: 
```axios.get('https://garbageapiprototype.azurewebsites.net/api/Posts?query=' + query+ "&limit=30&site=" + user.sites+ "&type=" + user.content + "&sort="+ user.sortBy + "&reverse=" + user.sort)```

Example Response: ```[{"sourceURL":"https://reddit.com/r/aww/comments/ckbolc/this_is_tiger_he_just_turned_31_we_are_told_he_is/","query":"cats","text":"This is Tiger. He just turned 31. We are told he is the oldest cat in the state of Illinois","score":181060,"date":1564594564,"author":"Aritilli","sourceSite":"reddit","subreddit":"r/aww","postType":"other","previewMediaURL":"https://i.redd.it/sg3q5cuedod31.jpg"}, ... ]``` 
 
# 3) Get User


