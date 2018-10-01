var express = require("express");
var app = express();
var mongoose = require("mongoose");


function db_start() {
  console.log("Connecting to database...");
  mongoose.connect("mongodb://localhost:27017/Up2Date", { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log("Database connection error: "+err);
    } else {
      console.log("Database connection successful.");
    }
  });
  mongoose.Promise = global.Promise;
  return mongoose.connection
}


function db_make_creds() {
  console.log("Creating usercreds model...");
  var usercreds_schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  var usercreds_model = mongoose.model("usercreds", usercreds_schema);
  console.log("Finished creating usercreds model.");
  return usercreds_model
}


function db_make_prefs() {
  console.log("Creating userprefs model...");
  var userprefs_schema = new mongoose.Schema({
    username: String,
    tags: [String],
  });
  var userprefs_model = mongoose.model("userprefs", userprefs_schema);
  console.log("Finished creating userprefs model.");
  return userprefs_model
}


function db_drop(models) {
  Object.keys(models).forEach((key) => {
    var mname = models[key].collection.collectionName;
    console.log("Dropping data from collection "+mname+"...");
    x = models[key].collection.drop();
    console.log("Dropped collection "+mname+".");
  });
  return true
}


function db_add(model, instance, callback = ()=>{}) {
  console.log("Inserting data "+JSON.stringify(instance)+" into collection "+model.collection.collectionName+"...");
  new_instance = new model(instance);
  new_instance.save((err) => {
    if (err) {
      console.log("Data insertion error: "+err);
      callback(false);
    } else {
      console.log("Data inserted successfully.");
      callback(true);
    }
  });
  return true
}


function db_find(model, query, callback = (docs)=>{return docs;}) {
  console.log("Searching "+model.collection.collectionName+" with query "+JSON.stringify(query)+" ...");
  model.find(query, (err, docs) => {
    if (err) {
      console.log("Search error: "+err);
      callback(false);
    } else {
      console.log("Search complete with "+docs.length+" result(s).");
      callback(docs);
    }
  });
  return true
}


function db_delete(model, query, callback = ()=>{}) {
  console.log("Deleting from "+model.collection.collectionName+" via query "+JSON.stringify(query)+" ...");
  model.deleteOne(query, (err) => {
    if (err) {
      console.log("Deletion error: "+err);
      callback(false);
    } else {
      console.log("Record deleted.");
      callback(true);
    }
  });
  return true
}


function db_update(model, query, instance, callback = ()=>{}) {
  console.log("Updating "+model.collection.collectionName+" via query "+JSON.stringify(query)+" with data "+JSON.stringify(instance)+" ...");
  model.updateOne(query, instance, (err) => {
    if (err) {
      console.log("Update error: "+err);
      callback(false);
    } else {
      console.log("Record updated.");
      callback(true);
    }
  });
  return true
}


function user_db(do_drop = false) {
  db_start();
  creds = db_make_creds();
  prefs = db_make_prefs();
  models = {'usercreds': creds, 'userprefs': prefs};
  if (do_drop) {
    //db_drop not truly synchronous; can drop fresh data if executed before connection is live, with data ready to insert
    //adding a blank row creates enough buffer to prevent it; investigate and fix this behavior later
    db_drop(models);
    db_add(creds,{username: "", email: "", password: ""});
    db_add(prefs,{username: "", tags: [""]});
  }
  return models
}


function user_add(models, username, email, password, callback = ()=>{}) {
  db_add(models.usercreds,{username: username, email: email, password: password}, ()=>{
    db_add(models.userprefs,{username: username, tags: [""]}, ()=>{
      callback();
    });
  });
  return true
}


function user_exists(models, username, callback) {
  db_find(models.usercreds,{username: username}, (doca) => {
    db_find(models.userprefs,{username: username}, (docb) => {
      if (doca.length >= 1 && docb.length >= 1) {
        callback(true);
      } else {
        callback(false);
      }
    });
  });
  return true
}


function user_get_creds(models, username, callback) {
  db_find(models.usercreds,{username: username}, (doc) => {
    if (doc.length == 1) {
      callback({username: doc[0].username, email: doc[0].email, password: doc[0].password});
    } else {
      callback(false);
    }
  });
  return true
}


function user_get_prefs(models, username, callback) {
  db_find(models.userprefs,{username: username}, (doc) => {
    if (doc.length == 1) {
      callback({username: doc[0].username, tags: doc[0].tags});
    } else {
      callback(false);
    }
  });
  return true
}


function user_delete(models, username) {
  return true
}


function user_update_creds(models, username, email, password) {
  return true
}


function user_update_prefs(models, username, tags) {
  return true
}


/* To check in mongo:
use Up2Date
db.usercreds.find()
db.userprefs.find()
*/

module.exports = {'user_db': user_db, 'user_add': user_add, 'user_exists': user_exists, 'user_get_creds': user_get_creds, 'user_get_prefs': user_get_prefs}