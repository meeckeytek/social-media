const { UserInputError } = require("apollo-server");
const Post = require("../../models/post.model");

module.exports = {
  Query: {
    //get all posts
    async getAllPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    //get single post
    async getPost(_, { postId }) {
      let post;

      try {
        post = await Post.findbyid(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("Post not found");
      }
      return post;
    },
  },
  Mutation: {
    //create new post
    async newPost(_, { postInput: { image, title, body } }) {
      if (
        image.trim() === "" ||
        title.trim() === "" ||
        body.trim() ||
        category.trim() === ""
      ) {
        throw new UserInputError("Please supply all necessary inputs");
      }

      const newPost = new Post({
        image,
        title,
        body,
        category,
        cloudinary_id,
      });

      let post;
      try {
        post = await newPost.save();
      } catch (error) {
        throw new Error(error);
      }
      return { ...post._doc };
    },

    // edit post
    async editPost(_, { postId, image, title, body }) {
      if (image.trim() === "" || title.trim() === "" || body.trim()) {
        throw new UserInputError("Please supply all necessary inputs");
      }
      let post;
      try {
        post = await Post.findById(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("No post found");
      }

      post.image = image || image;
      post.title = title || post.title;
      post.body = body || post.body;
      post.category = category || post.category;

      try {
        await post.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    //like post
    async likePost(_, { postId }) {
      let post;

      try {
        post = await Post.findbyid(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (post) {
        if (post.likes.find((like) => like.userId === "something")) {
          post.likes = post.likes.filter((like) => like.userId !== "something");
        } else {
          post.likes.push("something");
        }
      } else {
        throw new UserInputError("Post not found");
      }

      try {
        await post.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    //comment on post
    async commentPost(_, { postId, comment }) {
      let post;

      try {
        post = await Post.findbyid(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("Post not found");
      } else {
        post.comments.unshift({
          username: "username",
          comment,
          createdAt: new Date().toISOString(),
        });
      }

      try {
        await post.save();
      } catch (error) {
        throw new Error(error);
      }

      return post;
    },

    //delete post
    async deletePost(_, { postId }) {
      let post;

      try {
        post = await Post.findbyid(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("Post not found");
      }

      try {
        post.removd();
      } catch (error) {
        throw new Error(error);
      }
      return "Post deleted successfully";
    },
  },
};
