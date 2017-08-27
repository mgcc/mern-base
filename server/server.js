const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Mongoose and DB
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost/experiments';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);
// have to use mongoose@4.10.8 or else we'll get a deprecation warning
// Mongoose 4.11 currently has an internal code problem

// Instance Server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Models
require('./models/Book');
const Book = mongoose.model('Book');

// Routes
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

app.get('/api/book/list', (req, res) => {
  Book.find(function(err, books) {
    if (err) {
      res.send(err);
    } else {
      res.json(books);
    }
  })
});

app.post('/api/book/add', (req, res) => {
  const book = new Book(req.body);

  console.log(req.body);

  book.save((err, book) => {
    if (err) { console.log(error) }
    else {
      res.json(book);
    }
  });
})

// Starting...
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API is running at port ${PORT}`);
});