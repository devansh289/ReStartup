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
    const addthis = req.body;
    console.log(addthis);
    //var date = new Date();
    //var current_hour = date.getTime();
    //collection.insertOne({ hlo: current_hour });

    collection.find().toArray((err, items) => {
      res.json(items);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
