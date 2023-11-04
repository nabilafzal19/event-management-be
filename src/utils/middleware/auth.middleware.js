const jwt = require("jsonwebtoken");
const ROLE_ENUM = require("../constants");
const APIError = require("../error.class");

const authHandler = (permission = Object.values(ROLE_ENUM)) => {
  return function (req, res, next) {
    try {
      if (!req.header("authorization"))
        throw new APIError(
          "no token found",
          "Please login",
          403,
          "authHandler"
        );
      const authToken = req.header("authorization").replace("Bearer ", "");
      if (!authToken)
        throw new APIError(
          "invalid token",
          "Please authenticate",
          403,
          "authHandler"
        );
      const user = jwt.verify(authToken, process.env.SECRET_KEY);
      if (!permission.includes(user.role))
        throw new APIError(
          "not authorized",
          "Forbidden Route",
          403,
          "authHandler"
        );
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = authHandler;
