const User = require("../../models/user.model");

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
  Mutation: {
    async registerUser(
      _,
      {
        registerInpute: {
          firstname,
          lastname,
          username,
          phone,
          email,
          password,
        },
      }
    ) {
      let newUser = new User({
        firstname,
        lastname,
        username,
        phone,
        email,
        password,
      });
      try {
        const res = await newUser.save();
      } catch (error) {
        throw new Error(error);
      }

      return {
        ...res._doc,
      };
    },
  },
};
