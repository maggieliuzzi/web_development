var express = require("express");
var app = express();
var mongoose = require("mongoose");


function db_start() {
// Connects to MongoDB using Mongoose and creates the schemas/models for the database
// No arguments
// Returns an object containing the instantiated Mongoose models
  console.log("Connecting to database...");
  mongoose.connect("mongodb://localhost:27017/Up2Date", { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log("Database connection error: "+err);
    } else {
      console.log("Database connection successful.");
    }
  });
  mongoose.Promise = global.Promise;
  
  console.log("Creating collection schemas and models...");
  var usercreds_schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  var usercreds_model = mongoose.model("usercreds", usercreds_schema);
  console.log("Created model "+usercreds_model.collection.collectionName+".");
  var userprefs_schema = new mongoose.Schema({
    username: String,
    tags: [String],
  });
  var userprefs_model = mongoose.model("userprefs", userprefs_schema);
  console.log("Created model "+userprefs_model.collection.collectionName+".");

  return {'usercreds': usercreds_model, 'userprefs': userprefs_model}
}


function db_drop(model) {
// Drops the collection associated with a particular model
// 'model' argument is the model you want to drop the collection of
// Returns true
  var mname = model.collection.collectionName;
  console.log("Dropping data from collection "+mname+"...");
  model.collection.drop();
  console.log("Dropped collection "+mname+".");
  return true
}

function db_drop_all(models) {
// Drops the collections of all models defined by the model object as returned by db_start
// 'models' argument is the object of models you want to drop (from db_start)
// Returns true
  Object.keys(models).forEach((key) => {
    db_drop(models[key]);
  });
  return true
}

function db_add(model, instance) {
// Adds a new record to a particular collection
// 'model' is the model of the collection you're adding to, 'instance' is record itself (as an object)
// Returns true
  console.log("Inserting data "+JSON.stringify(instance)+" into collection "+model.collection.collectionName+"...");
  new_instance = new model(instance);
  new_instance.save((err) => {
    if (err) {
      console.log("Data insertion error: "+err);
    } else {
      console.log("Data inserted successfully.");
    }
  });
  return true
}

function db_find(model, query, callback) {
  console.log("Searching "+model.collection.collectionName+" with query "+JSON.stringify(query)+"...");
  model.find(query, (err, docs) => {
    if (err) {
      console.log("Search error: "+err);
      callback(false);
    } else {
      console.log("Search complete with "+docs.length+" result(s).");
      callback(docs);
    }
  });
}

function db_delete() {
  return true
}

function db_update() {
  return true
}

/* To use:
var db = require("./db")
db.db_connect()
db.db_create()
db.login_check()
db.login_create()
*/

/* To check:
use Up2Date
db.usercreds.find().pretty()
*/

module.exports = {'db_start': db_start, 'db_drop': db_drop, 'db_drop_all': db_drop_all,
'db_add': db_add, 'db_find': db_find, 'db_delete': db_delete, 'db_update': db_update}