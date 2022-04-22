const { UserInputError, AuthenticationError } = require("apollo-server");
const { isAuth, getUserIp } = require("../../middleware/util");
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
        post = await Post.findById(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("Post not found");
      }
      const userIp = getUserIp();
      let existedIp = post.views.find((ip) => ip.userIp === userIp);
      if (!existedIp) {
        post.views.push({userIp});
        await post.save();
      }
      return post;
    },
  },

  //Mutation
  Mutation: {
    //create new post
    async newPost(_, { postInput: { image, title, body, category } }, context) {
      console.log(image, title, body, category)
      const currentUser = isAuth(context);
      if (
        image.trim() === "" ||
        title.trim() === "" ||
        body.trim() === "" ||
        category.trim() === ""
      ) {
        throw new UserInputError("Please supply all necessary fields");
      }
      const newPost = new Post({
        image,
        title,
        body,
        category,
        creator: currentUser.id,
        cloudinary_id: "welcome",
      });

      let post;
      try {
        post = await newPost.save();

        // context.pubsub.publish("NEW_POST", {
        //   newPost: post,
        // });
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    // edit post
    async editPost(_, { postId, image, title, body }, context) {
      const currentUser = isAuth(context);
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

      if (post.creator !== currentUser.id) {
        throw new AuthenticationError(
          "You are not authorized to perform this operation"
        );
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
    async likePost(_, { postId }, context) {
      const currentUser = isAuth(context);
      let post;

      try {
        post = await Post.findById(postId);
      } catch (error) {
        throw new Error(error);
      }
      if (post) {
        if (post.likes.find((like) => like.userId === currentUser.id)) {
          post.likes = post.likes.filter(
            (like) => like.userId !== currentUser.id
          );
        } else {
          post.likes.push({userId: currentUser.id});
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
    async commentPost(_, { postId, comment }, context) {
      const currentUser = isAuth(context);

      if (comment.trim() === "") {
        throw new UserInputError("Empty comment", {
          error: {
            comment: "Comment can not be empty",
          },
        });
      }
      let post;

      try {
        post = await Post.findById(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("Post not found");
      } else {
        post.comments.unshift({
          userId: currentUser.id,
          username: currentUser.username,
          comment,
          createdAt: new Date().toISOString(),
        });
      }

      try {
        await post.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    //delete post comment

    async deletePostComment(_, { postId, commentId }, context) {
      const currentUser = isAuth(context);
      let post;

      try {
        post = await Post.findbyid(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (post) {
        let commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (post.comments[commentIndex].userId === currentUser.id) {
          post.comment.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError(
            "You are not authorized to perform this operation"
          );
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },

    //delete post
    async deletePost(_, { postId }, context) {
      const currentUser = isAuth(context);
      let post;

      try {
        post = await Post.findbyid(postId);
      } catch (error) {
        throw new Error(error);
      }

      if (!post) {
        throw new UserInputError("Post not found");
      }

      if (post.creator !== currentUser.id) {
        throw new AuthenticationError(
          "You are not authorized to perform this operation"
        );
      }

      try {
        post.removd();
      } catch (error) {
        throw new Error(error);
      }
      return "Post deleted successfully";
    },
  },

  // Subscription: {
  //   newPost: {
  //     subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
  //   },
  // },
};
