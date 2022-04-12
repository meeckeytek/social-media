const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    post: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;
