const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    post: String!
    username: String!
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
  }

  input RegisterInput {
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    registerUser(registerInpute: RegisterInput): User!
  }
`;
