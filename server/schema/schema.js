const graphql = require('graphql');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

//dummy data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: '1',
    authorId: '3'
  }, {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: '2',
    authorId: '2'
  }, {
    name: 'The Long Earch',
    genre: 'Sci-Fi',
    id: '3',
    authorId: '1'
  }
];

const authors = [
  {
    name: 'AAA', age: 1, id: '1'
  }, {
    name: 'BBB', age: 2, id: '2'
  }, {
    name: 'CCC', age: 3, id: '3'
  }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: {type: GraphQLID},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log('Book parent:', parent);
        return authors.find(author => author.id === parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.find(book => book.authorId === parent.id)
      }
    }
  })
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args){
        return books.find(book => book.id === args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_, args){
        return authors.find(author => author.id === args.id)
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(_, args) {
        return authors
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
