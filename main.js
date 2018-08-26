const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req, res) => {
  res.json({
    id: 1,
    username: "test",
    password: "blah"
  });
});

app.post("/api", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username:" + username + ",Password:" + password);
});
app.all("*", (req, res) => {
  res.sendStatus(404);
});
app.listen(3001, () => {
  console.log("Express server established and listening to localhost:3001");
});

