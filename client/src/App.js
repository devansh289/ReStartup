import React, { useState, useCallback } from "react";
import "./App.css";

const axios = require("axios");

function App() {
  const [myData, setData] = useState([]);

  const addItem = useCallback(() => {
    var self = this;
    var date = new Date();
    let current_hour = date.getTime();
    axios
      .post("/data", { date: current_hour })
      .then(data => data.data)
      .then(data => {
        self.setData(data);
        console.log(data);
        console.log(myData);
      });
  }, []);

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
      <button onClick={addItem} />
      {/* <ul>
        {myData.map(customer => (
          <p>{customer.date}</p>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
