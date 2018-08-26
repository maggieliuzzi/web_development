const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
  console.log("Username: " + username + ", Password: " + password);
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3001, () => {
  console.log("Express server established and listening to http://localhost:3001");
});

