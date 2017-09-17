const express = require('express');
const bodyParser = require('body-parser');

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
// for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Models
require('./models/Book');
const Book = mongoose.model('Book');

// Routes
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

// Get list of books
app.get('/api/book/list', (req, res) => {
  Book.find(function(err, books) {
    if (err) {
      res.send(err);
    } else {
      res.json(books);
    }
  })
});

// Get book by _id
app.get('/api/book/:bookId', (req, res) => {
  const _id = req.params.bookId;

  Book.findOne({ _id }, (err, book) => {
    if (book && !err) {
      res.send(book);
    } else {
      res.send({});
    }
  })
});

app.post('/api/book/add', (req, res) => {
  const book = new Book(req.body);

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