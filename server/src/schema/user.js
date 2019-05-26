import { gql } from 'apollo-server-express';

export default gql`
  "el type el gameeeel"
  type User {
    id: ID
    username: String
    email: String
    bio: String
    avatar: String
    maintainedLists: [List]
  }

  type LoginResult {
    token: String
  }

  type SignupResult {
    token: String
  }

  input LoginInput {
    username: String
    password: String
  }

  input SignupInput {
    username: String
    password: String
    email: String
    bio: String
    avatar: String
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    login(input: LoginInput): LoginResult
    signup(input: SignupInput): SignupResult
  }
`;