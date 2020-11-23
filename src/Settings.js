import React from "react";
import { User } from "./App";
import "./Settings.css";
import App from './App';
import ReactDOM from "react-dom";
import axios from"axios";
import Cookies from 'universal-cookie';
import { getCookie } from ".";

function Settings(user) {

    function cancel(){
        ReactDOM.render(App(user), document.getElementById('root'));
    }

    async function applySettings(){
        let content = document.querySelector('input[name="content"]:checked').value;
        let sites  = document.querySelector('input[name="site"]:checked').value;
        let sortBy  = document.querySelector('input[name="sort"]:checked').value;
        let sort  = document.querySelector('input[name="type"]:checked').value;
        if(sort === "true"){
            sort = true;
        } else{
            sort = false;
        }
        if(user.name == "default"){
            let nUse = new User(content, sites, sortBy, sort, user.name, user.pass,);
            return (  ReactDOM.render(
                <React.StrictMode>
                  {App(nUse)}
                </React.StrictMode>,
                document.getElementById('root')
              ));
        } else {
            //save user settings and load main page
            let x = await axios({
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

        }). then(function (response){
                let newUser = new User(content, sites, sortBy, sort, user.name, user.pass, user.id);
                return (  ReactDOM.render(
                    <React.StrictMode>
                      {App(newUser)}
                    </React.StrictMode>,
                    document.getElementById('root')))
            }
            );
        }

    }

    
    return (
    <header className = "App-header-S">
          Settings

          <p></p>
          <form className = "col">
              <div className = "Content-select">
              <p>Type of content: </p>
                  <input type = "radio"  id = "text"  name = "content" value = "text" defaultChecked = {user.content === "text"} ></input>
                  <label for = "text">Text</label><br></br>
                  <input  type = "radio" value = "other" id = "images" name = "content" defaultChecked = {user.content ==="other"}></input>
                  <label for = "images">Images</label><br></br>
                  <input type = "radio" name = "content" id = "all" value = "all" defaultChecked = {user.content === "all"}></input>
                  <label for = "all">All</label>
              </div>
              <div className = "Site-select">
              <p>Sites Used: </p>
                  <input type = "radio" name = "site" id = "reddit" value = "reddit" defaultChecked = {user.sites === "reddit"}></input>
                  <label for = "reddit">Reddit</label><br></br>
                  <input type = "radio"  id = "twitter" name = "site" value = "twitter" defaultChecked = {user.sites === "twitter"}></input>
                  <label for = "twitter">Twitter</label><br></br>
                  <input type = "radio" name = "site" id = "both" value = "both" defaultChecked = {user.sites === "both"}></input>
                  <label for = "both">Both</label>
              </div>
              </form>
              <form className = "col">
              <div className = "Sort-select">
              <p>Sort By: </p>
                  <input type = "radio" name = "sort" id = "score" value = "score" defaultChecked = {user.sortBy === "score"}></input>
                  <label for = "score">Score</label><br></br>
                  <input type = "radio" name = "sort" id = "new" value = "new" defaultChecked = {user.sortBy === "new"}></input>
                  <label for = "new">New</label>
              </div>
              <div className = "Sort-type">
              <p>How to Sort: </p>
                  <input type = "radio" name = "type" id = "desc" value = {true} defaultChecked = {user.sort}></input>
                  <label for = "desc">High to Low</label> <br></br>
                  <input type = "radio" name = "type" id = "asc" value = {false} defaultChecked = {!user.sort}></input>
                  <label for = "asc">Low to High</label>
              </div>
              <p>
              </p>
              <p></p>
              </form>
              <button className = "b" onClick = {applySettings}>Submit</button>
              <br></br>
              <button onClick = {cancel} className = "b">Cancel</button>
    </header>
    );
}



export default Settings;