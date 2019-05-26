import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { combineResolvers } from 'graphql-resolvers';
import Sequelize from 'sequelize';

import { isAuthenticated } from './middlewares/auth';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    me: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        // console.log('x-access-token', context.req.headers['x-access-token']);
        // console.log('me', context.me);
        const user = await context.models.User.findByPk(context.me.id);
        return user;
      },
    ),
  },
  User: {
    maintainedLists: async (parent, args, context) => await context.models.List.findAll({ where: { id: { [Sequelize.Op.in]: parent.dataValues.maintainedListsIDs } } }),
  },
  Mutation: {
    login: async (parent, args, context) => {
      const user = await context.models.User.findOne({
        where: { username: args.input.username },
      });

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await bcrypt.compare(args.input.password, user.password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, process.env.SECRET, '30d') };
    },
    signup: async (parent, args, context) => {
      const user = await context.models.User.create({
        username: args.input.username,
        password: args.input.password,
        email: args.input.email,
        bio: args.input.bio,
      });

      return { token: createToken(user, process.env.SECRET, '30d') };
    },
  },
};
