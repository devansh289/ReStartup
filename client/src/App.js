import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./App.css";

const axios = require("axios");

function App() {
  const [myData, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [show, setShow] = useState(false);

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

    axios
      .post("/data", {
        title: title,
        description: description,
        image: imageURL
      })
      .then(data => console.log("Response recieved from server"));

    loadItems();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <div>ReStartup</div>

      {/* Add option */}
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

      {/* Model starts here */}
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Individual containers */}
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
