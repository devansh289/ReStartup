const express = require("express");
const mongo = require("mongodb").MongoClient;
const axios = require("axios");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3003;

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
    // collection.remove();
    // collection = db.collection("userData");
    axios("https://api.flippa.com/v3/listings?has_bin=true")
      .then(response => {
        response.data.data.map(item => {
          collection.insertOne({
            title: item.hostname,
            description: item.summary,
            image: item.images.thumbnail.url,
            price: item.buy_it_now_price,
            url: item.external_url
          });
        });
      })
      .catch(err => console.log(err));
    res.end();
  });
});

//Static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
