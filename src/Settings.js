import React from "react";
import "./Settings.css";

function Settings() {
    return (
    <header className = "App-header-S">
          Settings

          <p></p>
          <form className = "col">
              <div className = "Content-select">
              <p>Type of content: </p>
                  <input type = "radio"  id = "text"  name = "content" value = "text" ></input>
                  <label for = "text">Text</label><br></br>
                  <input  type = "radio" value = "images" id = "images" name = "content"></input>
                  <label for = "images">Images</label><br></br>
                  <input type = "radio" name = "content" id = "all" value = "all"></input>
                  <label for = "all">All</label>
              </div>
              <div className = "Site-select">
              <p>Sites Used: </p>
                  <input type = "radio" name = "site" id = "reddit" value = "reddit"></input>
                  <label for = "reddit">Reddit</label><br></br>
                  <input type = "radio"  id = "twitter" name = "site" value = "twitter"></input>
                  <label for = "twitter">Twitter</label><br></br>
                  <input type = "radio" name = "site" id = "both" value = "both"></input>
                  <label for = "both">Both</label>
              </div>
              </form>
              <form className = "col">
              <div className = "Sort-select">
              <p>Sort By: </p>
                  <input type = "radio" name = "sort" id = "score" value = "score"></input>
                  <label for = "score">Score</label><br></br>
                  <input type = "radio" name = "sort" id = "new" value = "new"></input>
                  <label for = "new">New</label>
              </div>
              <div className = "Sort-type">
              <p>How to Sort: </p>
                  <input type = "radio" name = "type" id = "desc" value = {true}></input>
                  <label for = "desc">High to Low</label> <br></br>
                  <input type = "radio" name = "type" id = "asc" value = {false}></input>
                  <label for = "asc">Low to High</label>
              </div>
              <p>
              </p>
              <p></p>
              </form>
              <button className = "b">Submit</button>
    </header>
    );
}

export default Settings;