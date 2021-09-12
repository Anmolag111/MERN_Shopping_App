const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../middlewares/auth");
const { getToken, processPayment } = require("../controllers/paymentB");
const { getUserById } = require("../controllers/user");

// params
router.param("userid", getUserById);

//payment routes

//generate payment token
router.get("/payment/gettoken/:userid", isSignedIn, isAuthenticated, getToken);

// process payment
router.post(
  "/payment/braintree/:userid",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
