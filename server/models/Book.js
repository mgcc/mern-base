const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  author: { type: String, default: '' }
});

mongoose.model('Book', BookSchema);