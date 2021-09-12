const express = require("express");
const router = express.Router();
const {
  signout,
  signup,
  signin,
  forgotPass,
  resetPassWithToken,
  resetPassword,
} = require("../controllers/auth");

// routes
//signup
router.post("/signup", signup);

//signin
router.post("/signin", signin);

//signout
router.get("/signout", signout);

// forget pass
router.post("/forgot", forgotPass);

// forget pass reset pass via token
router.post("/reset/:token", resetPassWithToken);

// reset password
router.post("/reset", resetPassword);

module.exports = router;
