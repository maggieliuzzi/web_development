var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");


// -----------------------------------
// SOCKET.IO
// -----------------------------------

io.on("connection", function(socket) {
  console.log("Connection detected!");
});

function genSamplePost() {
  titles = [
    "My Post",
    "Test Post",
    "Greeting",
    "New Status",
    "My Day",
    "New Entry",
    "Blog Post",
    "Reporting In"
  ];
  names = [
    "Mitchell",
    "Maggie",
    "Abhusha",
    "John",
    "Carol",
    "Mark",
    "Harry",
    "Jessie",
    "Mark",
    "Adrian",
    "Bob",
    "Tony",
    "Sarah"
  ];
  bodies = [
    "Nice day today.",
    "I love AIP!",
    "Anyone out there?",
    "Work is hard...",
    "Just testing things out.",
    "Greetings everyone!",
    "Check this out...",
    "I'm the best :)",
    "Oops..."
  ];
  sources = [
    "Facebook",
    "Twitter",
    "News.com",
    "Mag.com",
    "Up2Date",
    "Instagram",
    "Chatter.com",
    "Tumblr"
  ];
  dates = [
    "21/3/18",
    "15/4/18",
    "7/5/18",
    "27/7/18",
    "1/8/18",
    "19/9/18",
    "14/3/18",
    "17/4/18",
    "29/5/18",
    "5/7/18",
    "6/8/18",
    "8/9/18"
  ];
  i = Math.random()
    .toString(36)
    .slice(2);
  t = titles[Math.floor(Math.random() * titles.length)];
  n = names[Math.floor(Math.random() * names.length)];
  b = bodies[Math.floor(Math.random() * bodies.length)];
  s = sources[Math.floor(Math.random() * sources.length)];
  d = dates[Math.floor(Math.random() * dates.length)];
  io.emit("samplePost", {
    id: i,
    title: t,
    content: b,
    posted: d,
    author: n,
    source: s
  });
}
setInterval(genSamplePost, 3000);


// -----------------------------------
// EXPRESS
// -----------------------------------

// Enables body-parser to parse JSON and URLEncoded streams
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connects to the MongoDB database
var db = require("./db");
var m = db.user_db(true);

// Responds to POST at "/api/new" by adding a user to the database
app.post("/api/new", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = "placeholder@mail.com";
  db.user_add(m, username, email, password, (success, errmsg)=>{
    if (success) {
      res.json({success: true, error: null});
    } else {
      res.json({success: false, error: errmsg});
    }
  });
});

// Responds to POST at "/api/check" by checking if a user's credentials are correct
app.post("/api/check", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  db.user_check(m, username, password, (result, success, errmsg)=>{
    if (success) {
      res.json({success: true, error: null, result: result});
    } else {
      res.json({success: false, error: errmsg, result: null});
    }
  });
});

// Responds to requests at "/api", confirming it's the API root
app.all("/api", (req, res) => {
  res.send("This is the api root.");
});

// Responds to requests at "/all", confirming it's the server root
app.all("/", (req, res) => {
  res.send("This is the server root.");
});

// Connections to unknown locations return a 404
app.all("*", (req, res) => {
  res.sendStatus(404);
});

// Makes the app listen at http://localhost:3001
http.listen(3001, () => {
  console.log("Express server established and listening to http://localhost:3001");
});