const express = require("express");
const mongo = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const axios = require("axios");
var bodyParser = require("body-parser");
const app = express();
const PORT = 3003;

const url = "mongodb://localhost:27017";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/datasend", (req, res) => {
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("CONNNECTED");
    const db = client.db("userData");
    const collection = db.collection("userData");

    // collection.insertOne({
    //   title: req.body.title,
    //   description: req.body.description,
    //   image: req.body.image
    // });

    axios(
      "https://api.flippa.com/v3/listings?has_bin=true&broker_seller=true&category=automotive"
    )
      .then(response => {
        response.data.data.map(item => {
          collection.insertOne({
            title: item.hostname,
            description: item.summary,
            image: item.images.thumbnail.url
          });
        });
      })
      .catch(err => console.log(err));

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
      console.log(items);
      res.send(items);
    });
  });
});

app.get("/moredata", (req, res) => {
  axios(
    "https://api.flippa.com/v3/listings?has_bin=true&broker_seller=true&category=automotive"
  ).then(response => res.send(response.data));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
