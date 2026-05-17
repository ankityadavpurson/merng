const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const healthCheck = require("./utils/health");

async function startServer() {
  try {
    mongoose.set("strictQuery", true);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req }),
    });

    const app = express();

    app.get("/health", healthCheck);

    app.use(express.static(__dirname + "/client/build"));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });

    await server.start();
    server.applyMiddleware({ app });

    const MONGODB_URL = process.env.MONGODB_URL;
    const conn = await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

    const { name, host, port } = conn.connection;
    console.log(
      `MongoDB connected :) with name = ${name}, host = ${host}, port = ${port}.`
    );

    const PORT = process.env.PORT || 5000;
    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = startServer;
