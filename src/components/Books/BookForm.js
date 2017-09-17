import React, { Component } from 'react';

export class BookForm extends Component {

  render() {

    const { author, title, onChangeTitle, onChangeAuthor, submitNewBook } = this.props;

    return (
      <form id="new-form" onSubmit={submitNewBook}>
        <input
          placeholder="title"
          type="text"
          name="title"
          value={title}
          onChange={onChangeTitle}
        />
        <input
          placeholder="author"
          type="text"
          name="author"
          value={author}
          onChange={onChangeAuthor}
        />
        <button type="submit">
          Add Book
        </button>
      </form>
    );
  }
}

export default BookForm;
