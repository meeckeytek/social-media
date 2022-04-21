const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    image: String!
    title: String!
    body: String!
    views: [User]
    likes:[User]
    creator:[User]
    cloudinary_id: String!
    comment: [User]
  }

  input PostInputs {
    image: String!
    title: String!
    body: String!
  }

  input EditPostInput {
    image: String
    title: String
    body: String
  }

  type User {
    id: ID!
    picture: String!
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
    cloudinary_id: String
    token: String
  }

  input RegisterInput{
    picture: String!
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input EditUserInput{
    picture: String
    firstname: String
    lastname: String
    username: String
    phone: String
    password: String
    confirmPassword: String
  }

  type Query {
    getUser(id: ID!): User!
    getAllUsers: [User]

    getPost(id: ID!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User
    editUser(editUserInput: EditUserInput): User!
    editPassword(userId: ID!, password: String!, confirmPassword: String!): String
    deleteUser(userId: ID): String

    newPost(postInput: PostInputs): Post
    editPost(postId: ID!, editPostInput: EditPostInput): Post
    likePost(postId: ID!): String
    commentPost(postId: ID!, comment: String): Post
    deleteComment(postId: ID!, commentId: ID!): String
    deletePost(postId: ID!): String
  }
`;
