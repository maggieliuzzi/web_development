const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });

const User = mongoose.model('User', {
    userKey: Number,
    username: {type: String, index: true},
    password: String,
    email: String,
});

User
    .remove({})
    .then(() => {
        new User({username: 'marysmith', password: 'aip2021', email: 'mary.smith@gmail.com'}).save();
		new User({username: 'mitchclarke', password: 'swordfish', email: 'mitch.clarke@gmail.com'}).save();
    });

// ------------------------------------------------
// GET / people:
// Retrieve a list of all people in the database
// ------------------------------------------------

app.use('/users', (req, res) => {
    User
        .find()
        .then(results => res.json(results));
});

// ------------------------------------------------
// GET /find?name=<Name>
// Retrieve full details of all records matching the supplied name
// ------------------------------------------------
app.use('/find', (req, res) => {
    User
        .find({username: req.query.username})
        .then(results => res.json(results));
});

app.listen(3001, () => {
  console.log("Express server established and listening to localhost:3001");
});