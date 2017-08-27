import React, { Component } from 'react';

export class BookForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: '',
      title: ''
    };

    this.addBook = this.addBook.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  addBook() {
    // const form = new FormData(document.getElementById('new-book'));
    // console.log(form);
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
      (res) => { console.log(res) },
      (e) => { console.log(e) }
    )
    ;
  }

  onChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  render() {

    return (
      <form id="new-form">
        <input
          placeholder="title"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.onChangeTitle}
        />
        <input
          placeholder="author"
          type="text"
          name="author"
          value={this.state.author}
          onChange={this.onChangeAuthor}
        />
        <button type="button" onClick={this.addBook}>
          Add Book
        </button>
      </form>
    );
  }
}

export default BookForm;
