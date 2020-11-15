import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from 'react-dom';
import Login from "./Login.js";
import Settings from"./Settings";

function App() {
  return (
    <div className="App">
       <div >
            <button className = "Auth-link" onClick = {loadLogin}>Login</button>
            <button className= "settings" onClick = {loadSettings}>
                Settings
            </button>
            </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome the Garbage Aggregator
        </p>
        <h3>
          You can use this site to find garbage from several social media sites, all at once!
        </h3>
        <input type = "search" className = "search" autoComplete = "on"></input><button className = "search-button" >Search</button>
      <div className = "search-text">You can search for tags/keywords that you want to see!</div>
      </header>
    </div>
  );
}

export default App;

function loadLogin(){
ReactDOM.render(
  Login(), document.getElementById('root')
);
}

function loadSettings() {
  ReactDOM.render(
    Settings(), document.getElementById('root')
  );
}
