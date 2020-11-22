import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { User } from './App';
import reportWebVitals from './reportWebVitals';
import {performLogin} from "./Login";


let use = new User("all", "both", "score", false, "default", "");


export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}



if(getCookie("user") === ""){
  ReactDOM.render(
    <React.StrictMode>
      {App(use)}
    </React.StrictMode>,
    document.getElementById('root')
  );
} else{
  performLogin(getCookie("user"), getCookie("pass"));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
