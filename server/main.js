const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
var bcrypt = require("bcrypt");
const saltRounds = 10;

//crypto encoding
//var crypto = require("crypto");
//var key = "TheKey%%%123";
//var test = " Testing Crypto!!";
//var enc = crypto.createCipher("aes-128-ccm".key).update("text", "utf8", "hex");
//console.log("The encrypted word is : ", enc);

// Connects Mongoose to the database "Up2Date" in MongoDB via localhost:27017
mongoose.connect(
  "mongodb://localhost:27017/Up2Date",
  { useNewUrlParser: true }
);

// Moongoose defines the schema for our database
const User = mongoose.model("User", {
  username: { type: String, index: true },
  password: String,
  email: String
});
const NewsPost = mongoose.model("NewsPost", {
  source: String,
  author: String,
  body: String,
  date: String
});

// Populate the database with dummy data
User.remove({}).then(() => {
  new User({
    username: "marysmith",
    password: "aip2021",
    email: "mary.smith@gmail.com"
  }).save();
  new User({
    username: "mitchclarke",
    password: "swordfish",
    email: "mitch.clarke@gmail.com"
  }).save();
});
NewsPost.remove({}).then(() => {
  new NewsPost({
    source: "NewsSite.com",
    author: "Harry Bernstein",
    body: "An important advancement in science has occured today, result in...",
    date: "2018-7-20"
  }).save();
  new NewsPost({
    source: "Twitter",
    author: "@Banana",
    body: "This is a very important Twitter post. Please pay attention.",
    date: "2018-7-19"
  }).save();
  new NewsPost({
    source: "NewsSite.com",
    author: "Greg Fields",
    body:
      "A new species of beetle was discovered today in Australian rainforests...",
    date: "2018-7-17"
  }).save();
  new NewsPost({
    source: "Facebook",
    author: "Mitchell Clarke",
    body:
      "Advanced Internet Programming is the best class ever! I've learnt so much!",
    date: "2018-7-17"
  }).save();
  new NewsPost({
    source: "NewsSite.com",
    author: "John Smith",
    body:
      "10 ways in which robots are dooming humanity! Number 9 will absolutely shock you!",
    date: "2018-7-16"
  }).save();
});

// Prepares the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded());
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/Up2Date";

app.post("/api", (req, res) => {
  try {
    var loginDetails = {
      username: req.body.username,
      password: req.body.password
    };
    console.log(
      "Username: " +
        loginDetails.username +
        ", Password: " +
        loginDetails.password
    );

    MongoClient.connect(
      url,
      function(err, db) {
        if (err) {
          console.log("Connection to Database Cannot be made");
        } else {
          var dbo = db.db("Up2Date");
          bcrypt.hash(loginDetails.password, saltRounds, function(error, hash) {
            if (!error) {
              var loginDetails = {
                username: req.body.username,
                password: hash
              };
              dbo
                .collection("loginDetails")
                .insertMany([loginDetails], function(err, res) {
                  if (err) {
                    console.log("Document not inserted");
                    db.close();
                  } else {
                    console.log("1 document inserted");
                    db.close();
                    //redirect to the user's Page
                  }
                });
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500);
  }
});

// Returns all of the users in the database
app.get("/users", (req, res) => {
  User.find().then(results => res.json(results));
});

app.post("/loginCheck", (req, res) => {
  try {
    //console.log("you reached here !!");
    var loginDetails = {
      username: req.body.username,
      password: req.body.password
    };

    MongoClient.connect(
      url,
      function(err, db) {
        if (err) console.log("Connection to Database Cannot be made");
        else {
          var dbo = db.db("Up2Date");
          dbo
            .collection("loginDetails")
            .find({
              username: req.body.username
              // password: req.body.password
            })
            .toArray(function(err, data) {
              if (err) console.log("error");
              if (data) {
                bcrypt.compare(
                  loginDetails.password,
                  data[0].password,
                  function(err, res) {
                    if (!err) {
                      console.log(
                        "You are allowed login. Username and Password matched"
                      );
                      //redirect from here. Access Allowed
                    } else
                      console.log("Error occured when comparing Hash/salt");
                  }
                );
              }
            });
        }
      }
    );
  } catch (error) {
    res.status(500);
  }
});

// Returns all of the news posts in the database
app.get("/newsposts", (req, res) => {
  NewsPost.find().then(results => res.json(results));
});

// Connections to unknown locations return a 404
app.all("*", (req, res) => {
  res.sendStatus(404);
});

// Makes the app listen to localhost:3001
app.listen(3001, () => {
  console.log(
    "Express server established and listening to http://localhost:3001"
  );
});
