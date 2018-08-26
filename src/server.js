/*
Tutorial followed: https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c
Other tools used: MLab (MongoDB as a Service) https://www.mlab.com/ - Chose AWS, Ireland (EU).
npm add mongoose
To set things as environment variables, I typed $ export DB_URI=mongodb://maggieliuzzi:aip2018@ds161529.mlab.com:61529/mern-comment-box
*/

// server.js or backend/server.js
// Connecting our database in our backend/server.js

import { getSecret } from './secrets';
import Comment from './models/comment';

// ... removed for brevity
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// other routes and stuff

// Creating a new route and give it GET and POST HTTP methods to retrieve data from and post data to our database we connected
  res.json({ message: 'Hello, World!' });
// }); // This is meant to go after the previous line, not sure inside where. "Add this in below our root route"

router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

router.post('/comments', (req, res) => {
  const comment = new Comment();
  // body parser lets us use the req.body // Pulling those fields off the req.body object and creating two variables (author and text) from those values
  const { author, text } = req.body;
  if (!author || !text) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});