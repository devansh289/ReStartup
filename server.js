const express = require("express");
const mongo = require("mongodb").MongoClient;
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();
const PORT = 3003;

const url = "mongodb://localhost:27017";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/data", (req, res) => {
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db("userData");
    const collection = db.collection("userData");

    collection.insertOne({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image
    });
    //collection.find().toArray((err, items) => {
    // res.send(items);
    //});
    res.end();
  });
});

app.get("/data", (req, res) => {
  mongo.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      return;
    }

    const db = client.db("userData");
    const collection = db.collection("userData");
    collection.find().toArray((err, items) => {
      res.send(items);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
