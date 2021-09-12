const logger = require("../utils/logger");
const expressJwt = require("express-jwt");
require("dotenv").config();

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    logger.debug("isAdmin Access Denied, Not Admin");
    res.status(403).json({
      errorMessage: "Access Denied, Not Admin",
    });
  }

  next();
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  let check =
    req.profile && req.auth && req.auth.userid === req.profile._id.toString();
  if (!check) {
    logger.debug("isAuthenticated Failed");
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  next();
};
