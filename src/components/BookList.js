import React, { Component } from 'react';

export class BookList extends Component {
  render() {
    const { books } = this.props;

    return (
      <ol>
        {books && books.map(book =>
          <li key={book._id}>
            {book.title} - {book.author}
          </li>
        )}
      </ol>
    )
  }
}

export default BookList;