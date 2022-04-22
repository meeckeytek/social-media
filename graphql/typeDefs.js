const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    image: String!
    title: String!
    body: String!
    category: String!
    views: [View]!
    likes: [Like]!
    creator: String!
    cloudinary_id: String!
    comments: [Comment]!
    likeCount: Int!
    commentsCount: Int!
    viewsCount: Int!
  }

  type View {
    userIp: String!
  }

  type Comment {
    id: ID!
    userId: String!
    username: String!
    comment: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    userId: String!
  }

  input PostInput {
    image: String!
    title: String!
    body: String!
    category: String!
  }

  input EditPostInput {
    image: String
    title: String
    body: String
    category: String
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

  input RegisterInput {
    picture: String!
    firstname: String!
    lastname: String!
    username: String!
    phone: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input EditUserInput {
    picture: String
    firstname: String
    lastname: String
    username: String
    phone: String
    password: String
    confirmPassword: String
  }

  type Query {
    getUser(userId: ID!): User!
    getAllUsers: [User]

    getPost(postId: ID!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User
    editUser(editUserInput: EditUserInput): User!
    editPassword(
      userId: ID!
      password: String!
      confirmPassword: String!
    ): String
    deleteUser(userId: ID): String

    newPost(postInput: PostInput): Post
    editPost(postId: ID!, editPostInput: EditPostInput): Post!
    likePost(postId: ID!): Post!
    commentPost(postId: ID!, comment: String): Post!
    deletePostComment(postId: ID!, commentId: ID!): Post!
    deletePost(postId: ID!): String
  }

  # type Subscription{
  #   newPost: Post!
  # }
`;
