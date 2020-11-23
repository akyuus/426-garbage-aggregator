# The Garbage Aggregator 

This is an application that lets you query both Reddit and Twitter and access the results. The url for the site is https://426garbageaggregator.azurewebsites.net/.

# API Documentation

1) Getting Posts

Endpoint: GET https://garbageapiprototype.azurewebsites.net/api/Posts

Parameters:
  1) query (string) - Optional. The keyword to search for. Defaults to "cats".
  2) limit (int) - Optional. The number of posts to return. Defaults to 10.
  3) type (string) - Optional. Must be one of "text", "other" or "all". Determines what kind of posts to return (if something contains anything other than text, it becomes                            "other"). Defaults to "all".
  4) site (string) - Optional. Must be one of "reddit", "twitter", or "both". Determines what site to get posts from. Defaults to "both".
  5) reverse (boolean) - Optional. Reverses the output if true. Defaults to false.

2) 
