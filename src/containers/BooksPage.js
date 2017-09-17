import React, { Component } from 'react';

// components
import BookForm from '../components/Books/BookForm';
import BookList from '../components/Books/BookList';

class BookPage extends Component {

  // Have to bring onsubmit function here since it has to refresh BookList Data

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      books: null
    }

    this.submitNewBook = this.submitNewBook.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  componentDidMount() {
    this.fetchBooks();
  }

  // BookList functions
  fetchBooks() {
    fetch('http://localhost:3001/api/book/list')
      .then(response => response.json())
      .then(result => this.setState({ books: result }))
      .catch(e => console.log(e));
  }

  // BookForm functions
  submitNewBook(event) {
    event.preventDefault();

    const data = {
      author: this.state.author,
      title: this.state.title
    }

    fetch('http://localhost:3001/api/book/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(
      (res) => { this.fetchBooks(); },
      (e) => { console.log(e); }
    );

    this.setState({ author: '', title: '' });
  }

  onChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  render() {

    return (
      <div>
        <BookForm
          title={this.state.title}
          author={this.state.author}
          onChangeAuthor={this.onChangeAuthor}
          onChangeTitle={this.onChangeTitle}
          submitNewBook={this.submitNewBook}
          />
        <BookList
          books={this.state.books}
          />
      </div>
    );
  }
}

export default BookPage;