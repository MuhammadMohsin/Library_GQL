const graphql = require("graphql");
const AuthorType = require("./Author");
const BookType = require("./Book");
const Book = require("../model/Book");
const Author = require("../model/Author");
// const books = require('../json/books.json');
// const authors = require('./../json/authors.json');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return books.find((b) => b.id === args.id)
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return authors.find((author) => author.id === args.id)
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                // return books;
                return new Promise((res, rej) => {
                    Book.find({}).populate('authorId')
                        .exec(function (err, books) {
                            if (err) {
                                console.log("error in all books: ", err);
                                rej(er);
                            }
                            const filteredBooks = books.map(book => {
                                book.author = book.authorId;
                                book.authorId = book.authorId.id.toString();
                                return book;
                            })
                            res(filteredBooks);
                        });
                })
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                // return authors;
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const author = new Author({
                    name: args.name,
                    age: args.age,
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLString },
                authorId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                console.log(args)
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});