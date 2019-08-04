const express = require("express");
const app = express();
const PORT = 3003;

app.get("/data", (req, res) => {
  const customers = [{ id: 1, name: "John" }, { id: 2, name: "Bill" }];
  res.json(customers);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
