const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    post: String!
    username: String!
  }

  type User {
    id: ID!
    # picture: String
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
    # cloudinary_id: String!
    # token: String!
  }

  input RegisterInput{
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
  }
`;
