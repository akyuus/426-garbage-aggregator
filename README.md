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
id              | id     | The id of the associated user. This is set to (-1) unless the login endpoint is used.
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
```js
 axios.get('https://garbageapiprototype.azurewebsites.net/api/Posts?query=' + query+ "&limit=30&site=" + user.sites+ "&type=" + user.content + "&sort="+ user.sortBy + "&reverse=" + user.sort)
 ```

Example Response: 

```
[{"sourceURL":"https://reddit.com/r/aww/comments/ckbolc/this_is_tiger_he_just_turned_31_we_are_told_he_is/","query":"cats","text":"This is Tiger. He just turned 31. We are told he is the oldest cat in the state of Illinois","score":181060,"date":1564594564,"author":"Aritilli","sourceSite":"reddit","subreddit":"r/aww","postType":"other","previewMediaURL":"https://i.redd.it/sg3q5cuedod31.jpg"}, ... ]
``` 
 
## 3) Get User

```
Endpoint: GET https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/:id
```

Response: Responds with the preferences of the user with this id. Returns null if you are not logged in as this user. 

Example Axios Request: 
```js
 axios.get('https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/33')
 ```
 
Example Response:
```
{
    "sortPref": "new",
    "typePref": "image",
    "sitePref": "reddit",
    "reversePref": false,
    "id": -1
}
```

## 4) Login 

```
Endpoint: POST https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/login
```

Parameters:
  1) username (string) - Your username.
  2) password (string) - Your password. 

Response: Responds with the preferences of this user, if the username and password combination is correct. Otherwise, returns null.

Example Axios Request:
```js
axios.post("https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/login", {username: name, password: password} )
```
Example Response: 
```
{
    "sortPref": "new",
    "typePref": "image",
    "sitePref": "reddit",
    "reversePref": false,
    "id": 33
}
```

## 5) Register 

```
Endpoint: POST https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/register
```

Parameters:
  1) username (string) - Your username.
  2) password (string) - Your password.
  3) sortPref (string) - Sorting preferences (see Preference object above).
  4) typePref (string) - Type preferences 
  5) sitePref (string) - Site preferences
  6) reversePref (bool) - Reverse preference

Response: Responds with a default Preferences object.

Example Axios Request: 
```js
axios({
      method: "post",
      url: "https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/register" ,
      data: {
        username: name, 
        password: pass, 
        sortPref: "score", 
        typePref: "all", 
        sitePref: "both", 
        reversePref: false
      }
})
```

Example Response:
```
{
    "sortPref": "score",
    "typePref": "all",
    "sitePref": "both",
    "reversePref": false,
    "id": -1
}
```

## 6) Change preferences

```
Endpoint: PUT https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/:id
```

Changes the preference of this user, based on their id. Returns a bad request if you are not currently logged in with this id. Otherwise, returns null.

Parameters:
  1) username (string) - Your username.
  2) password (string) - Your password.
  3) sortPref (string) - Sorting preferences (see Preference object above).
  4) typePref (string) - Type preferences 
  5) sitePref (string) - Site preferences
  6) reversePref (bool) - Reverse preference

Example Axios Request: 
```js
axios({
  method: "put",
  url: "https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/"+user.id,
  data: {
    "username": user.name, 
    "password": user.pass, 
    "sortPref": sortBy, 
    "typePref": content, 
    "sitePref": sites, 
    "reversePref": sort
  }
})
```

Example Response: nothing

## 7) Delete User

Note: This endpoint is not used in the application.

```
Endpoint: DELETE https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/:id
```

Parameters:
  1) username (string) - Your username.
  2) password (string) - Your password.
  3) sortPref (string) - Sorting preferences (see Preference object above).
  4) typePref (string) - Type preferences 
  5) sitePref (string) - Site preferences
  6) reversePref (bool) - Reverse preference
  
This fails and returns a 401 if you are not logged in as this user.

Example Axios Request:
```js
axios({
  method: "delete",
  url: "https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/"+user.id,
  data: {
        username: name, 
        password: pass, 
        sortPref: "score", 
        typePref: "all", 
        sitePref: "both", 
        reversePref: false
  }
})
```

Example Response:
```
{
    "id": 33,
    "username": "poopfeast421",
    "password": "$MYHASH$V1$10000$3AE6E2183iKHqpPjnGWGNpOKaSAUHCx8mItqa+2MfjfJa1hn",
    "sortPref": "new",
    "typePref": "image",
    "sitePref": "reddit",
    "reversePref": false
}
```
