const express = require("express");
const mongo = require("mongodb").MongoClient;
const axios = require("axios");
var bodyParser = require("body-parser");
const app = express();
const PORT = 3003;

const url = "mongodb://localhost:27017";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get("/newData", (req, res) => {
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("CONNNECTED");
    const db = client.db("userData");
    let collection = db.collection("userData");
    collection.remove();
    collection = db.collection("userData");
    axios(
      "https://api.flippa.com/v3/listings?has_bin=true&broker_seller=true&category=automotive"
    )
      .then(response => {
        response.data.data.map(item => {
          collection.insertOne({
            title: item.title,
            description: item.description,
            image: item.images.thumbnail.url,
            price: item.buy_it_now_price
          });
        });
      })
      .catch(err => console.log(err));
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
