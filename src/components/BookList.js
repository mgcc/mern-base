import React, { Component } from 'react';

export class BookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: null
    }

    this.fetchBooks = this.fetchBooks.bind(this);
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    fetch('http://localhost:3001/api/book/list')
      .then(response => response.json())
      .then(result => this.setState({ books: result }))
      .catch(e => console.log(e));
  }

  render() {
    if (!this.state.books) { return null; }
    return (
      <ol>
        {this.state.books.map(book =>
          <li key={book._id}>
            {book.title} - {book.author}
          </li>
        )}
      </ol>
    )
  }
}

export default BookList;