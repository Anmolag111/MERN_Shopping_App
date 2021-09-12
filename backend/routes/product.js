const express = require("express");
const router = express.Router();

const { isAdmin, isSignedIn, isAuthenticated } = require("../middlewares/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueProductCategories,
} = require("../controllers/product");
const getProductImage = require("../middlewares/getProductImage");

// parmas
router.param("userid", getUserById);
router.param("productid", getProductById);

// product routes
// create product
router.post(
  "/product/create/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// get product
router.get("/product/:productid", getProduct);
router.get("/product/photo/:productid", getProductImage);

// delete Product Route
router.delete(
  "/product/:productid/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update Product Route
router.put(
  "/product/:productid/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// get all Products Route
router.get("/products", getAllProducts);

// get all unique product categories route
router.get("/products/categories", getAllUniqueProductCategories);

module.exports = router;
