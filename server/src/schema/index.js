import { gql } from 'apollo-server-express';

import userSchema from './user';
import listSchema from './list';
// import paginationSchema from './pagination';
import commonSchema from './common';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, listSchema, commonSchema];