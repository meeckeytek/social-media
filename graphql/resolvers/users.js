const User = require("../../models/user.model");
const { UserInputError } = require("apollo-server");
const { getToken, isAuth } = require("../../middleware/util");
const bcrypt = require("bcryptjs");
const {
  registerInputValidate,
  editInputValidate,
} = require("../../middleware/validation");


module.exports = {
  Query: {
    // get user
    async getUser(_, { userId }, context) {
      const currentUser = isAuth(context);

      console.log(currentUser)
      let user;
      try {
        user = await User.findById(userId);
      } catch (error) {
        throw new Error(error);
      }
      if (!user) {
        throw new UserInputError("No user foind");
      }
      return {
        ...user._doc
      };
    },

    // get all users
    async getAllUsers() {
      let users;

      try {
        users = await User.find();
      } catch (error) {
        throw new Error(error);
      }
      if (users.length < 1) {
        throw new Error("No user found");
      }
      return users;
    },

  },
  Mutation: {
    // Register user
    async registerUser(
      _,
      {
        registerInput: {
          picture,
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

      let existedUser;
      try {
        existedUser = await User.findOne({ email });
      } catch (error) {
        throw new Error(error);
      }
      if (existedUser) {
        throw new UserInputError("User already exists", {
          errors: {
            email: "Email already exists",
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      let newUser = new User({
        picture,
        firstname,
        lastname,
        username,
        phone,
        email,
        password: hashedPassword,
        cloudinary_id: "cloudinary_id",
      });
      let user;
      try {
        user = await newUser.save();
      } catch (err) {
        throw new Error(err);
      }
      return {
        ...user._doc,
        id: user._id,
        token: getToken(user),
      };
    },
    // login user
    async login(_, { email, password }) {
      if (email === "" || password === "") {
        throw new UserInputError("Please supply your email and password");
      }

      let user;
      try {
        user = await User.findOne({ email });
      } catch (error) {
        throw new Error(error);
      }

      if (!user) {
        throw new UserInputError("Invalid email address");
      }

      let isValidPassword;

      try {
        isValidPassword = await bcrypt.compare(password, user.password);
      } catch (error) {
        throw new Error(error);
      }
      if (!isValidPassword) {
        throw new UserInputError("Invalid user credentials");
      }
      return {
        ...user._doc,
        id: user._id,
        token: getToken(user),
      };
    },
    // edit user
    async editUser(
      _,
      { editUserInput: { picture, firstname, lastname, username, phone } }, context
    ) {
      
      const currentUser = isAuth(context)
      const { valid, errors } = editInputValidate(
        firstname,
        lastname,
        username,
        phone
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      let existedUser;
      try {
        existedUser = await User.findById(currentUser.id);
      } catch (error) {
        throw new Error(error);
      }

      if (!existedUser) {
        throw new UserInputError("Invalid user email");
      }

      existedUser.picture = picture || existedUser.picture;
      existedUser.firstname = firstname || existedUser.firstname;
      existedUser.lastname = lastname || existedUser.lastname;
      existedUser.username = username || existedUser.username;
      existedUser.phone = phone || existedUser.phone;

      try {
        await existedUser.save();
        return existedUser;
      } catch (error) {
        throw new Error(error);
      }
    },
    // edit password
    async editPassword(_, { email, password, confirmPassword }) {
      if (password === "" || password !== confirmPassword) {
        throw new UserInputError(
          "Please check your password and confirm password"
        );
      }
      let existedUser;
      try {
        existedUser = await User.findById(userId);
      } catch (error) {
        throw new Error(error);
      }

      if (!existedUser) {
        throw new UserInputError("Invalid user");
      }

      let hashedPassword = await bcrypt.hash(password, 12);
      existedUser.password = hashedPassword || existedUser.password;

      try {
        await existedUser.save();
        return "Password changed successfully";
      } catch (error) {
        throw new Error(error);
      }
    },
    // delete user
    async deleteUser(_, { userId }) {
      let user;
      try {
        user = await User.findById(userId);
      } catch (error) {
        throw new Error(error);
      }
      if (!user) {
        throw new UserInputError("Invalid user details");
      }

      try {
        await user.remove();
        return "User deleted successfully";
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
