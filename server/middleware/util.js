const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

exports.getToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      phone: user.phone,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
};

exports.getUserIp = () => {
  const userIp = Object.values(require("os").networkInterfaces())
    .flat()
    .filter((item) => !item.internal && item.family === "IPv4")
    .find(Boolean).address;
  return userIp;
};

exports.isAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = context.req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, `${process.env.SECRET_KEY}`);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Invalid Authentication token");
  }
  throw new Error("Authentication token must be provided");
};
