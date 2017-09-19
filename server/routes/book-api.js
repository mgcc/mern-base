const Book = require('mongoose').model('Book');

module.exports = (app) => {
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
}