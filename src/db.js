const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Document mapping
// i.e., declare the schema of collections in the db
// ------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/demo', { useNewUrlParser: true });

const User = mongoose.model('User', {
    userKey: Int,
    username: {type: String, index: true},  // Index on name for faster querying
    password: String,
    email: String,
});

Person
    .remove({}) // Remove existing people
    .then(() => {
        // new Person({username: 'maggieliuzzi', password: 'aip2018', email: 'mrmliuzzi@gmail.com'}).save();
        // new Person({username: 'mitchellclarke', password: 'aip2019', email: 'mjclarke@gmail.com'}).save();
        // new Person({username: 'abhushabogati', password: 'aip2020', email: 'abhusha.bogati@gmail.com'}).save();
        new Person({username: 'marysmith', password: 'aip2021', email: 'mary.smith@gmail.com'}).save();
    });


// ------------------------------------------------
// GET / people:
// Retrieve a list of all people in the database
//
// Note: this code does not catch database errors
// ------------------------------------------------

app.use('/users', (req, res) => {
    User
        .find()
        .then(results => res.json(results));
});

// ------------------------------------------------
// GET /find?name=<Name>
// Retrieve full details of all records matching the supplied name
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/find', (req, res) => {
    User
        .find({username: req.query.username})
        .then(results => res.json(results));
});