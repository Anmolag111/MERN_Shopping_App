const userCrud = require("../db/helpers/usercrud");
const User = require("../models/User");
const logger = require("../utils/logger");
const sendMail = require("../utils/mail");
const tokenOperations = require("../utils/token");

exports.signup = async (req, res) => {
  const { fname, lname, email, pass } = req.body;
  if (!fname || !lname) {
    return res
      .status(400)
      .json({ error: "You are required to enter full name" });
  }
  if (!email) {
    return res.status(400).json({ error: "You are required to add email" });
  }
  if (!pass) {
    return res.status(400).json({ error: "You are required to add password" });
  }
  try {
    await userCrud.checkIfUserExist(email);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "This email is already registered with us!" });
  }

  const userObject = new User(fname, lname, email, pass);
  let promise = userCrud.addUser(userObject);
  promise
    .then((user) => {
      sendMail(user.email, "signup", null, user);
      res.status(201).json({
        success: `User ${user.fname} Created Successfully!`,
        id: user._id,
        name: user.fname,
      });
    })
    .catch((err) => {
      logger.error("Encountered some error while Registering User", err);
      res.status(400).json({
        error: `Can't register user,Check Data`,
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "You are required to enter email" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: "You are required to enter password" });
  }
  const promise = userCrud.findUser(email, password);
  promise
    .then((user) => {
      const token = tokenOperations.generateToken(user._id);
      res.cookie("token", token);
      const { email, fname, _id, role } = user;
      res.status(200).json({
        success: "Successfully Logged in!",
        token,
        user: {
          email,
          _id,
          fname,
          role,
        },
      });
    })
    .catch((err) => {
      logger.error("Error in signin Route ", err);
      res.status(400).json({
        error: "email / password Wrong",
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: "Successfully Logged Out!!",
  });
};

exports.forgotPass = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "You must enter an email address." });
  }

  let promise = userCrud.generateForgotToken(email);
  promise
    .then((user) => {
      sendMail(user.email, "reset", req.headers.host, user.resetPasswordToken);
      res.status(200).json({
        success: "Please check your email for the link to reset your password.",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

exports.resetPassWithToken = (req, res) => {
  const password = req.body.password;
  const resetPasswordToken = req.params.token;
  if (!password) {
    return res.status(400).json({ error: "You must enter a password." });
  }
  let promise = userCrud.resetPassWithToken(password, resetPasswordToken);
  promise
    .then((user) => {
      sendMail(user.email, "reset-confirmation");
      res.status(200).json({
        success:
          "Password changed successfully. Please login with your new password.",
      });
    })
    .catch((err) => {
      logger.debug("caught an error on restepass via token", err);
      res.status(400).json({
        error: err.message,
      });
    });
};

exports.resetPassword = (req, res) => {
  const { confirmpassword, email, password } = req.body;

  if (!password && !confirmpassword) {
    return res
      .status(400)
      .json({ error: "You are required to enter password" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password Min Length should be 8" });
  }

  let promise = userCrud.resetPass(email, password);
  promise
    .then((user) => {
      sendMail(user.email, "reset-confirmation");
      res.status(200).json({
        success:
          "Password changed successfully. Please login with your new password.",
      });
    })
    .catch((err) => {
      logger.debug("reset pass encounterd an error", err);
      res.status(400).json({
        error: err.message,
      });
    });
};
