import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import models, { sequelize } from './src/models';
import resolvers from './src/resolvers';
import typeDefs from './src/schema';
import jwt from 'jsonwebtoken';

dotenv.config();

(async () => {

const getMe = async req => {
  const token = req.headers['x-access-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: async ({ req, connection, res }) => {
    return ({
      models: models,
      req,
      connection,
      res,
      me: await getMe(req),
    })},
});

const app = express();

// apply middlewares
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    callback(null, true);
  },  
}));
app.use(bodyParser.json());

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  console.log('sql connected');

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

})();
