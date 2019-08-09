import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

const axios = require("axios");

function App() {
  const [myData, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    axios
      .get("/data")
      .then(response => response.data)
      .then(data => {
        console.log(data);
        setData(data);
      });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("Submitting Data");
    var date = new Date();
    let current_hour = date.getTime();
    axios
      .post("/data", {
        title: title,
        description: description,
        image: imageURL
      })
      .then(data => console.log("Response recieved from server"));

    loadItems();
  };

  return (
    <div className="App">
      <div>ReStartup</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="url"
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <div className="container">
        {myData.map(item => (
          <div key={item._id} className="project">
            <img src={item.image} className="image" alt="" />
            <p>
              {item.title} --> {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
