const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    id: 1,
    username: "test",
    password: "blah"
  });
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});
app.listen(3001, () => {
  console.log("Express server established and listening to localhost:3001");
});
