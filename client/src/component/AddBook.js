import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    var data = this.props.authors;
    if(data.loading)
    {
      return (<option disabled> Loading... </option>)
    }
    else {
      return (
        data.authors.map(author => {
          return (<option key={author.id} value={author.id}>{author.name}</option>)
        })
      )
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBook({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return(
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
      <h2>Add New Book</h2>
          <div className="field">
              <label>Book name:</label>
              <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
          </div>
          <div className="field">
              <label>Genre:</label>
              <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
          </div>
          <div className="field">
              <label>Author:</label>
              <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                  <option>Select author</option>
                  { this.displayAuthors() }
              </select>
          </div>
          <button>+</button>
      </form>
    )
  }

}

export default compose(
  graphql(getAuthorsQuery, { name: "authors" }),
  graphql(addBookMutation, { name: "addBook" })
)(AddBook);
