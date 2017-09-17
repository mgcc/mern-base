import React, { Component } from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

export class BookList extends Component {
  render() {
    const { books } = this.props;

    return (
      <ol>
        {books && books.map(book =>
          <li key={book._id}>
            <Link to={`/book/${book._id}`}>
              {book.title}
            </Link>
            &nbsp; - {book.author}
          </li>
        )}
      </ol>
    )
  }
}

export default BookList;