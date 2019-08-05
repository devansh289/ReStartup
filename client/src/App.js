import React, { useState, useEffect } from "react";
import "./App.css";

const axios = require('axios');

function App() {
  const [myData, setData] = useState([]);

  useEffect(() => {
    /*fetch("/data")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });*/
    
      axios.post('/data', )
  }, []);

  const addItem = () => {
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
  };

  return (
    <div className="App">
      <button />
      <ul>
        {myData.map(customer => (
          <p>{customer.hlo}</p>
        ))}
      </ul>
    </div>
  );
}

export default App;
