const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategoryById,
  getCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../middlewares/auth");

// params
router.param("userid", getUserById);
router.param("categoryid", getCategoryById);

// category routes
// create
router.post(
  "/category/create/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
// get
router.get("/category/:categoryid", getCategory);
router.get("/categories", getAllCategories);

//update
router.put(
  "/category/:categoryid/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// delete
router.delete(
  "/category/:categoryid/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
