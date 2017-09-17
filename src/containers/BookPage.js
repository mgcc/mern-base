import React, { Component } from 'react';

// const BookPage = ({ match }) =>
//   <div>
//     Hey there
//     { match.params.bookId }
//   </div>

class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props.match.params.bookId,
      title: '',
      author: ''
    }
  }

  componentDidMount() {
    //fetch book

    fetch(`http://localhost:3001/api/book/${this.state._id}`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          title: result.title,
          author: result.author
        })
      })
      .catch(e => console.log(e));
  }



  render() {
    const { title, author } = this.state;

    return (
      <div>
        {title} - {author}
      </div>
    );
  }
}

export default BookPage;