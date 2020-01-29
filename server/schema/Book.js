const graphql = require("graphql");
const AuthorType = require("./Author");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: { type: AuthorType }
    })
});

module.exports = BookType;