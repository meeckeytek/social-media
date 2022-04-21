const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose
  .connect(process.env.CONNECTIONURI, { useNewUrlParser: true })
  .then(() => {
    return server
      .listen({ port: 3000 })
      .then((res) => {
        console.log(`Server running at ${res.url}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
