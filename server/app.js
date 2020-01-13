const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://mohsin:test123@cluster0-puiwc.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("Database connected successfully!");
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, function () {
    console.log("App start listening on port: ", port);
});