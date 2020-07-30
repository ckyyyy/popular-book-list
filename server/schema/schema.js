const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../model/book');
const Author = require('../model/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// var books = [
//   {name: 'Book 1', genre: 'Fantasy', id: '1', authorId: '1'},
//   {name: 'Book 2', genre: 'Fantasy', id: '2', authorId: '2'},
//   {name: 'Book 3', genre: 'Sci-Fi', id: '3', authorId: '3'},
//   {name: 'Book 4', genre: 'Fantasy', id: '4', authorId: '2'},
//   {name: 'Book 5', genre: 'Fantasy', id: '5', authorId: '3'},
//   {name: 'Book 6', genre: 'Sci-Fi', id: '6', authorId: '3'}
// ];
//
// var authors = [
//   {name: 'Tom Cheung', age: 44, id: '1'},
//   {name: 'Peter Yip', age: 42, id: '2'},
//   {name: 'Kelvin Cho', age: 53, id: '3'}
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        // return _.find(authors, {id: parent.authorId});
        return Author.findById(parent.authorId);
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return _.filter(books, {authorId: parent.id});
        return Book.find({authorId: parent.id})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // {
    //   book(id: "5f22a40fafc04b1359e901d8"){
    //     name
    //     genre
    //     author{
    //       name
    //     }
    //   }
    // }
    book: {
      type: BookType,
      // id is the argument passed into the query
      // GraphQLID in a query can be int or string
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from db / other source
        // return _.find(books, {id: args.id});
        return Book.findById(args.id)
      }
    },
    // {
    //   author(id: "5f22a298afc04b1359e901d5"){
    //     name
    //   }
    // }
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id)
      }
    },
    // {
    //   books{
    //     name
    //     genre
    //     author{
    //       name
    //     }
    //   }
    // }
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return books
        return Book.find({});
      }
    },
    // {
    //   authors{
    //     name
    //     age
    //     books{
    //       name
    //       genre
    //     }
    //   }
    // }
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        // return authors
        return Author.find({});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
