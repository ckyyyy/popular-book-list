import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails(){
    const { book } = this.props.data;
    if(book){
      return (
        <div>
          <h2>Book Details</h2>
          <h4> Book Name: {book.name} </h4>
          <p> Genre: {book.genre} </p>
          <p> Author: {book.author.name} </p>
          <p> All books by this author: </p>
          <ul className="other-books">
            { book.author.books.map(item => {
              return <li key={item.id}> {item.name} </li>
            }) }
          </ul>
        </div>
      )
    }
    else {
      return (
        <div>
          <h2>Book Details</h2>
          <p>No book selected</p>
        </div>
      )
    }
  }
  render () {
    console.log(this.props)
    return (
      <div id="book-details">
          {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id
      }
    }
  }
})(BookDetails);
