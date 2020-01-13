const graphql = require("graphql");
const books = require('../json/books.json');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type : new GraphQLList(require("./Book")),
            resolve(parent, args){
                return books.filter(book=> book.authorId == parent.id)
            }
        }
       
    })
})

module.exports = AuthorType;