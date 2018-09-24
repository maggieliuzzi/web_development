var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

// -----------------------------------
// SOCKET.IO
// -----------------------------------

io.on('connection', function(socket){
	console.log('Connection detected!');
});

function genSamplePost() {
	titles = ["My Post","Test Post","Greeting","New Status","My Day","New Entry","Blog Post","Reporting In"];
	names = ["Mitchell","Maggie","Abhusha","John","Carol","Mark","Harry","Jessie","Mark","Adrian","Bob","Tony","Sarah"];
	bodies = ["Nice day today.","I love AIP!","Anyone out there?","Work is hard...","Just testing things out.","Greetings everyone!","Check this out...","I'm the best :)","Oops..."];
	sources = ["Facebook","Twitter","News.com","Mag.com","Up2Date","Instagram","Chatter.com","Tumblr"];
	dates = ["21/3/18","15/4/18","7/5/18","27/7/18","1/8/18","19/9/18","14/3/18","17/4/18","29/5/18","5/7/18","6/8/18","8/9/18"];
	i = Math.random().toString(36).slice(2)
	t = titles[Math.floor(Math.random()*(titles.length))];
	n = names[Math.floor(Math.random()*(names.length))];
	b = bodies[Math.floor(Math.random()*(bodies.length))];
	s = sources[Math.floor(Math.random()*(sources.length))];
	d = dates[Math.floor(Math.random()*(dates.length))];
	io.emit('samplePost',{id: i, title: t, content: b, posted: d, author: n, source: s});
}
setInterval(genSamplePost,3000);

// -----------------------------------
// DATABASE
// -----------------------------------

// Connects Mongoose to the database "Up2Date" in MongoDB via localhost:27017
mongoose.connect('mongodb://localhost:27017/Up2Date', { useNewUrlParser: true });

// Moongoose defines the schema for our database
const User = mongoose.model('User', {
    username: {type: String, index: true},
    password: String,
    email: String,
});
const NewsPost = mongoose.model('NewsPost', {
	source: String,
	author: String,
	body: String,
	date: String
});

// Populate the database with dummy data
User
    .remove({})
    .then(() => {
        new User({username: 'marysmith', password: 'aip2021', email: 'mary.smith@gmail.com'}).save();
		new User({username: 'mitchclarke', password: 'swordfish', email: 'mitch.clarke@gmail.com'}).save();
    });
NewsPost
    .remove({})
	.then(() => {
		new NewsPost({
			source: 'NewsSite.com',
			author: 'Harry Bernstein',
			body: "An important advancement in science has occured today, result in...",
			date: "2018-7-20"}).save();
		new NewsPost({
			source: 'Twitter',
			author: '@Banana',
			body: "This is a very important Twitter post. Please pay attention.",
			date: "2018-7-19"}).save();
		new NewsPost({
			source: 'NewsSite.com',
			author: 'Greg Fields',
			body: "A new species of beetle was discovered today in Australian rainforests...",
			date: "2018-7-17"}).save();
		new NewsPost({
			source: 'Facebook',
			author: 'Mitchell Clarke',
			body: "Advanced Internet Programming is the best class ever! I've learnt so much!",
			date: "2018-7-17"}).save();
		new NewsPost({
			source: 'NewsSite.com',
			author: 'John Smith',
			body: "10 ways in which robots are dooming humanity! Number 9 will absolutely shock you!",
			date: "2018-7-16"}).save();
	});


// -----------------------------------
// EXPRESS
// -----------------------------------

// Enables body-parser to parse JSON and URLEncoded streams
app.use(express.json());
app.use(express.urlencoded());

// Dummy React->Express API handler; meant to accept data from the Login page's form
app.post("/api", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username: " + username + ", Password: " + password);
});

// Returns all of the users in the database
app.get('/users', (req, res) => {
    User
        .find()
        .then(results => res.json(results));
});

// Returns all of the news posts in the database
app.get('/newsposts', (req, res) => {
    NewsPost
        .find()
        .then(results => res.json(results));
});

// Connections to unknown locations return a 404
app.all("*", (req, res) => {
  res.sendStatus(404);
});

// Makes the app listen to localhost:3001
http.listen(3001, () => {
  console.log("Express server established and listening to http://localhost:3001");
});