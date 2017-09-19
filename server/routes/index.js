const bookApi = require('./book-api');
// const authorApi = require('./author-api');

module.exports = (app) => {
  bookApi(app);
  // authorApi(app);
}