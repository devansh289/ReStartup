import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./App.css";

const axios = require("axios");

function App() {
  const [myData, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [currentElement, setCurrentElement] = useState({});

  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

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

  const handleHide = () => setShow(false);
  const handleShow = data => {
    setShow(true);
    setCurrentElement({
      title: data.title,
      description: data.description,
      image: data.image
    });
    console.log(data);
  };

  const handleAddHide = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <div className="App">
      <div className="title">ReStartup</div>
      <button type="button" onClick={() => handleAddShow()}>
        CLICK ME
      </button>

      {/* Add option */}

      {/* Model starts here */}
      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>{currentElement.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Model starts here */}
      <Modal show={showAddModal} onHide={handleAddHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Individual containers */}
      <div className="container">
        {myData.map(item => (
          <div
            key={item._id}
            className="project"
            value={item}
            onClick={() => handleShow(item)}
          >
            <img src={item.image} className="image" alt="" />
            <p id="title">{item.title}</p>
            <p> {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
