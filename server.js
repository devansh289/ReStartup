const express = require("express");
const mongo = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const app = express();
const PORT = 3003;

const url = "mongodb://localhost:27017";

app.get("/data", (req, res) => {
  //const customers = [{ id: 1, name: "John" }, { id: 2, name: "Bill" }];
  //res.json(customers);

  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db("userData");
    const collection = db.collection("userData");

    var date = new Date();
    var current_hour = date.getTime();
    //collection.insertOne({ hlo: current_hour });

    collection.find().toArray((err, items) => {
      res.json(items);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
