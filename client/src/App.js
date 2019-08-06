import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

const axios = require("axios");

function App() {
  const [myData, setData] = useState([]);
  const [search, setSearch] = useState("");

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

    /*
    const data = await fetch(
      "https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get"
    );
    const items = await data.json();

    console.log(items.items);
    setData(items.items);*/
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("Submitting Data");
    var date = new Date();
    let current_hour = date.getTime();
    axios
      .post("/data", { date: current_hour })
      .then(data => console.log("dedeed"));
  };

  /*const addItem = useCallback(() => {
    var date = new Date();
    let current_hour = date.getTime();
    axios
      .post("/data", { date: current_hour })
      .then(data => data.data)
      .then(data => {
        setData([{ d: "dd" }, { d: "ee" }]);
        console.log(data);
        console.log(myData);
      });
  }, []);*/

  /*const addItem = () => {
    useEffect(() => {}, []);

    useEffect(() => {
      fetch("/data", {
        headers: {
          'Accept': "application/json"
          'Content-Type' : "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setData(data);
        });
    }, []);
  };*/

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      {/*myData.map(item => (
        <p key={item._id}>{item._id}</p>
      ))}
      {
        <ul>
          {myData.map(customer => (
            <p>{customer.date}</p>
          ))}
        </ul>
          */}
    </div>
  );
}

export default App;
