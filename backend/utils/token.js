const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenOperations = {
  secret: process.env.SECRET_KEY,
  generateToken(userid) {
    return jwt.sign({ userid }, this.secret, { expiresIn: "8h" });
  },
  verifyToken(token) {
    return jwt.decode(token, this.secret);
  },
};

module.exports = tokenOperations;
