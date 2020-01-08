const graphql = require("graphql");
const books = require('../json/books.json');
const authors = require('./../json/authors.json');
const AuthorType = require("./Author");
const BookType = require("./Book");

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID
} = graphql;


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find((b) => b.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find((author) => author.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});