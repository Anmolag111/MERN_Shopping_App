const express = require("express");
const router = express.Router();
const { makepayment } = require("../controllers/stripepayment");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../middlewares/auth");

// params
router.param("userid", getUserById);
// routes
// proess payment
router.post("/stripepayment/:userid", isSignedIn, isAuthenticated, makepayment);

module.exports = router;
