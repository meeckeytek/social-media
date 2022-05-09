const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const gql = require('graphql-tag');
const express = require('express');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDatabase = require("./middleware/db")
dotenv.config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

(async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const pubsub = new PubSub();
  
  
  const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res, pubsub }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
          async serverWillStart() {
              return {
                  async drainServer() {
                      subscriptionServer.close();
                  }
              };
          }
      }],
  });


const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  async onConnect(
      connectionParams,
      webSocket,
      context
  ) {
      console.log('Connected!');
      return {
          pubsub
      }
  },
  onDisconnect(webSocket, context) {
      console.log('Disconnected!')
  },
}, {
  server: httpServer,
  path: server.graphqlPath,
});

// More required logic for integrating with Express
await server.start();
server.applyMiddleware({app});

// Modified server startup
connectDatabase();
await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})(typeDefs, resolvers);