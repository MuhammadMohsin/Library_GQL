const graphql = require("graphql");
const authors = require('./../json/authors.json');
const AuthorType = require("./Author");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
})

module.exports = BookType;