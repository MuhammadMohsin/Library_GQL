const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const app = express();
const port = 5000;

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, function () {
    console.log("App start listening on port: ", port);
})