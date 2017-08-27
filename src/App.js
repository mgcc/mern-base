import React, { Component } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to the Library App</h2>
        <BookForm />
        <BookList />
      </div>
    );
  }
}

export default App;
