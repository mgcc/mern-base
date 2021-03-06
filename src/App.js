import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Header from './components/common/Header';

// containers
import HomePage from './containers/HomePage';
import AuthorsPage from './containers/AuthorsPage';
import BooksPage from './containers/BooksPage';
import BookPage from './containers/BookPage';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} setUser={this.setUser} />

          <Route exact={true} path="/" component={HomePage} />

          <Route path="/authors" component={AuthorsPage} />
          <Route path="/books" component={BooksPage} />

          <Route path="/book/:bookId" component={BookPage} />

        </div>
      </Router>
    );
  }
}

export default App;
