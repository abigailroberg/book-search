const express = require('express');
// import Apollo
const { ApolloServer } = require('apollo-server-express')

// import typeDefs and resolvers & middleware
const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth');

// const path = require('path');
const db = require('./config/connection');

// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // create new Apollo server; pass in schemas
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })

  await server.start()

  server.applyMiddleware({ app })

  // log GQL API test location
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}

startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
