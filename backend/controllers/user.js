const orderCrud = require("../db/helpers/orderCrud");
const userCrud = require("../db/helpers/usercrud");
const logger = require("../utils/logger");

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await userCrud.findUserById(id);
    req.profile = user;
  } catch (err) {
    logger.debug("error in user route", err);
    return res.status(400).json({
      error: "No user was found in DB",
    });
  }
  next();
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile._v = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userCrud.updateUser(req.profile._id, req.body);
    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user._v = undefined;
    res.status(200).json(user);
  } catch (err) {
    logger.debug("error at update user route", err);
    res.status(400).json({
      error: "You are not authroised to update this user!",
    });
  }
};

exports.userPurchaseList = async (req, res) => {
  try {
    const order = await orderCrud.getPurchaseList(req.profile._id);
    res.status(200).json(order);
  } catch (err) {
    logger.debug("caught error in order route", err);
    res.status(400).json({
      error: "no order found",
    });
  }
};
