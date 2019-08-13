import React, { useState, useEffect } from "react";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
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

  //OnLoad
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    axios
      .get("/data")
      .then(response => response.data)
      .then(data => {
        setData(data);
      });
  };

  //Sumbit data using add button
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("Submitting Data");

    axios
      .get("/data", {
        title: title,
        description: description,
        image: imageURL
      })
      .then(data => console.log("Response recieved from server"));

    loadItems();
  };

  //Modal opened onclick
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

  //Add item modal open
  const handleAddHide = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />

      <div className="header">
        <h1 className="title">ReStartup</h1>
        {/* <button
          variant="btm-primary"
          className="addButton"
          onClick={() => handleAddShow()}
        >
          Add Company
        </button> */}
      </div>
      <div className="subHeading">A place where you can buy startups.</div>
      {/* Add option */}

      {/* Model starts here */}
      <Modal show={show} onHide={handleHide}>
        <Modal.Header className="modalHeader">
          <Modal.Title className="modalHeaderText">
            {currentElement.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={currentElement.image} width="144px" height="144px" />
          {currentElement.description}
        </Modal.Body>
        <Modal.Footer className="modalHeader">
          <Button variant="light" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Model starts here */}
      <Modal show={showAddModal} onHide={handleAddHide}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              Name:
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              Description:
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div>
              Image URL:
              <input
                type="url"
                value={imageURL}
                onChange={e => setImageURL(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              value="submit"
              variant="secondary"
              onClick={handleHide}
            >
              Close
            </Button>
          </Modal.Footer>
        </form>
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
            <p className="subTitle">{item.hostname}</p>
            <p className="description"> {item.description}</p>
            <p className="price">$13</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
