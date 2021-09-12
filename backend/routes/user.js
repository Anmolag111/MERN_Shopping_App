const express = require("express");
const router = express.Router();
const { isAuthenticated, isSignedIn } = require("../middlewares/auth");
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");

// params
router.param("userid", getUserById);

// user routes

// get user details
router.get("/user/:userid", isSignedIn, isAuthenticated, getUser);
// update user details
router.put("/user/:userid", isSignedIn, isAuthenticated, updateUser);
// update user purchase list
router.get(
  "/orders/user/:userid",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
