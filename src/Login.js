import React from "react";
import "./Login.css";

function Login() {
    return (
        <header className = "App-header">
            Login
            <p></p>
            <form>
                <label>Username: </label>
                <p></p>
            <input type = "text" name = "Username" ></input>
            <p></p>
            <label>Password: </label>
            <p></p>
            <input type = "text" name = "Password"></input>
            <p></p>
            <button>Submit</button>
            </form>
        </header>
    );
  }

  export default Login;