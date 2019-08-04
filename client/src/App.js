import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [myData, setData] = useState([]);

  useEffect(() => {
    fetch("/data")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      <button />
      <ul>
        {myData.map(customer => (
          <p>{customer.name}</p>
        ))}
      </ul>
    </div>
  );
}

export default App;
