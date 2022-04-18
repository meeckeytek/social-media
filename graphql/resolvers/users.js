const User = require("../../models/user.model");
const {UserInputError} = require("apollo-server");
const { registerInputValidate } = require("../../middleware/validation");
const {getToken} = require("../../middleware/util")

module.exports = {
  Query: {},
  Mutation: {
    async registerUser(
      _,
      {
        registerInput: {
          firstname,
          lastname,
          username,
          phone,
          email,
          password,
          confirmPassword,
        },
      }
    ) {
      const { valid, errors } = registerInputValidate(
        firstname,
        lastname,
        username,
        phone,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      let newUser = new User({
        picture:"picture",
        firstname,
        lastname,
        username,
        phone,
        email,
        password,
        cloudinary_id: "cloudinary_id"
      });
      let response;
      try {
        response = await newUser.save();
      } catch (err) {
        throw new Error(err);
      }
      // const token = getToken(response);
      return {
        ...response._doc,
        // token
      };
    },
  },
};
