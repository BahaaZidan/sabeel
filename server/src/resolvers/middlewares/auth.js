import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, context) => context.me ? skip : new ForbiddenError('Not authenticated as user.');