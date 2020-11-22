import React from "react";
import "./Login.css";
import {User} from "./App";
import App from './App';
import ReactDOM from 'react-dom';
import axios from "axios";
import {getCookie, deleteAllCookies} from "./index";

function Login() {
    async function signUp(e){
        //push signup info
        //return to main page logged in with the new User
        e.preventDefault()
         let name = document.getElementById("signName").value;
         let pass = document.getElementById("signWord").value;
         
             if(!name.match(/^[a-z0-9]+$/i)){
             alert("Username is invalid");
             return("");
         }
         if(!pass.match(/^[a-z0-9]+$/i)){
             alert("Password is invalid");
             return("");
         }
         try {
             let s = await axios({
                 method: "post",
                 url: "https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/register" ,
                 data :{
                 username: name, password: pass, sortPref: "score", typePref: "all", sitePref: "both", reversePref: false
             }}
             ).then(function(response){
                 if(response.status === 204){
                    alert("Username is already taken");
                 } else{
                     performLogin(name, pass);
                 }

             });
         } catch (error) {
         }

        }
        function cancel(){
            ReactDOM.render(App(new User("all", "both", "score", false, "default", "")), document.getElementById('root'));
        }

    return (
        <header className = "App-header">
            <div className = "login">
            Login
            <p></p>
            <form>
                <label>Username: </label>
                <p></p>
            <input type = "text" name = "Username" id = "username"></input>
            <p></p>
            <label>Password: </label>
            <p></p>
            <input type = "password" name = "Password" id = "password"></input>
            <p></p>
            <button onClick = {logIn.bind(this)}>Submit</button>
            </form>
            <br></br>
            </div>
      <div className = "signup">
         Sign Up
         <p></p>
         <form>
             <label>Username: </label>
             <p></p>
         <input type = "text" name = "Username" id = "signName"></input>
         <p></p>
         <label>Password: </label>
         <p></p>
         <input type = "password" name = "Password" id = "signWord"></input>
         <p></p>
         <button onClick = {signUp.bind(this)}>Submit</button>
         </form>
        <button onClick = {cancel}>Cancel</button>
     </div>
     </header>
    );
}

export async function performLogin(name, password){
    //get User info
    //return to main page with a new User
    if(name === ""|| name === undefined){
        alert("Username is Required");
    }
    if(password === "" || password === undefined){
        alert("Password is Required");
    }
    try {
        let l = await axios.post("https://garbageapiprototype.azurewebsites.net/api/ApplicationUsers/login", {username: name, password: password} ).then(
            function(response){
                if(response.status === 200){
                let prefs = response.data;
                let user = new User(prefs.typePref, prefs.sitePref, prefs.sortPref, prefs.reversePref, name, password, prefs.id);
                if(getCookie("user") !== "" || getCookie("user") === name){
                }else{
                    deleteAllCookies();
                    createCookie("user_id", user.id, 0.05);
                createCookie("user", name, .05);
                createCookie("pass", password, .05);
                }
                ReactDOM.render(App(user), document.getElementById('root'));
            } else{
                alert("incorrect username or password");
            }
        }
        )
    } catch (error) {
        alert("Username or Password is Incorrect");
        
    }

}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}


export function logIn(e){
    e.preventDefault();
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    performLogin(name, password);
}

  export default Login;