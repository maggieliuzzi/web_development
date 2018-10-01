var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Up2Date");
var db = mongoose.connection;

// Moongoose defines the schema for our database
var userschema = new mongoose.Schema({
  _id: string,
  username: String,
  password: String
});

var usermodel = mongoose.model("loginDetails", userschema);

app.get("/", (req, res) => {
  res.send("Hello, from the server!");
});

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});
