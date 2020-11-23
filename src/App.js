import logo from './logo.svg';
import trash from "./trash.svg";
import './App.css';
import React from "react";
import ReactDOM from 'react-dom';
import Login from "./Login.js";
import Settings from"./Settings";
import axios from 'axios';
import {getCookie, deleteAllCookies} from "./index";
import {performLogin} from "./Login";

export class User {
  content;
  sites;
  sortBy;
  sort;
  name;
  pass;
  id;
 constructor (content, sites, sortBy, sort, name, pass, id) {
this.content = content;
this.sites = sites;
this.sortBy = sortBy;
this.sort  = sort;
this.name = name;
this.pass = pass;
this.id = id;
return this;
  }

}




function App(person) {
let user = person;


let isLoggedIn = false;
if(user.name !== "default"){
  isLoggedIn = true;
}

function getLogin(){
  if (isLoggedIn){
  return <div className = "Auth-link">Welcome {user.name} <button onClick = {logOut}>Log Out</button></div>
  } else {
    return <button className = "Auth-link" onClick = {loadLogin}>Login / Signup</button>
  }
}
 function logOut(){
   deleteAllCookies();
   ReactDOM.render(
    <React.StrictMode>
      {App(new User("all", "both", "score", false, "default", ""))}
    </React.StrictMode>,
    document.getElementById('root')
  );

 }

  function loadLogin(){
    ReactDOM.render(
      Login(), document.getElementById('root')
    );
    }
    
    async function renderPost(posts){
      let ht = [];
      for(let i = 0; i < posts.length; i++){
        ht.push( await getPostHTML(posts[i]));
      }
      let lt = (<div className = "Posts">{ht}</div>)
      ReactDOM.render(
        <React.StrictMode>
          {App(user)}
          {ht}
        </React.StrictMode>,
        document.getElementById('root')
      );
    }

   async function getPostHTML(post){
      let date = new Date(post.date * 1000);
      let content;
      let sub;
      if(post.sourceSite == "reddit"){
      sub = (<div>Subreddit: {post.subreddit}</div>)
      if(post.postType == "text") {
      content = (<div className = "content" onClick ={function(){window.open(post.sourceURL)}}> <p className = "text">{post.text}</p></div>);
      } else {
        if(post.sourceSite == "reddit"){
          let url = post.previewMediaURL;
          url = url.toString();
          if(url.includes(".jpg") || url.includes(".png")){
          content = (<div className = "content" onClick ={function(){window.open(post.sourceURL)}}><img className = "image" src = {post.previewMediaURL}></img> 
          <p className = "text">{post.text}</p></div>);
          } else {
          content = <div className = "content" onClick ={function(){window.open(post.sourceURL)}}><a href = {post.previewMediaURL}>{post.previewMediaURL}</a></div>
      } 
    }
    }
   } else {
        let img;
        if(post.postType == "text"){
          img = <br></br>;
        } else{
          img = <img className = "image" src = {post.previewMediaURL}></img>;
        }
      content = (<div className = "content" onClick ={function(){window.open(post.sourceURL)}}><br></br> <p>{post.text}</p>{img}</div>);
      }
      let ht = (
    <div id = "Post" className = "post" > 
        <div>
          Author: {post.author} <br></br>
      Date Published: <time dateTime = {date}>{date.toDateString()}</time>
      <div id = "Post-content" className = "Post-content">
          {content}
      </div>
        score: {post.score}<br></br>
        Site: {post.sourceSite}
        {sub} <br></br>
    
        </div>
    </div>
      );
      return ht;
    }
    
    function loadPost(){
      let s = [];
      let query = document.getElementById("search").value;
    let posts = getPost(query, 20).then(function (result) {
      s = result; 
       for(let i = 0; i < s.length; i++){
         renderPost(s);
       }
      }, function () {console.log("failed")});
    }


    function urlClick(url){
      window.open(url);

    }

    let getPost = async (query, limit) => {
      try {
        let p2 = [];
        if( query != undefined || query !== ""){
        let posts =  await axios.get('https://garbageapiprototype.azurewebsites.net/api/Posts?query=' + query+ "&limit=30&site=" + user.sites+ "&type=" + user.content + "&sort="+ user.sortBy + "&reverse=" + user.sort).then(function(response){
        p2.push(response.data);
       });
       p2 = p2[0];
        return await p2;
      }else {
        let posts =  await axios.get('https://garbageapiprototype.azurewebsites.net/api/Posts').then(function(response){
        p2.push(response.data);
       });
       p2 = p2[0];
        return await p2;

      }
      
      } catch (error) {
        return error;
      }
    }
    
    function loadSettings() {
      ReactDOM.render(
        Settings(user), document.getElementById('root')
      );
    }







  return (
    <div className="App" id = "app">
       <div >
            {getLogin()}
            <button className= "settings" onClick = {loadSettings}>
                Settings
            </button>
            </div>
      <header className="App-header">
        <img src={trash} className="App-logo" alt="logo" />
        <p>
          Welcome the Garbage Aggregator
        </p>
        <h3>
          You can use this site to find garbage from several social media sites, all at once!
        </h3>
        <input type = "search"  id = "search" className = "search"></input><button  onClick = {loadPost} className = "search-button" >Search</button>
      <div className = "search-text">You can search for tags/keywords that you want to see!</div>
      </header>
    </div>
  );
}

export default App;

