const User = require("../../models/user.model")

module.exports = {
    Query: {
      async getPosts() {
        try {
          const posts = await Post.find();
        } catch (err) {
          throw new Error(err);
        }
      },
    },
  };