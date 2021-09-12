const express = require("express");
const router = express.Router();

const { isAdmin, isSignedIn, isAuthenticated } = require("../middlewares/auth");
const { getUserById } = require("../controllers/user");
const updateProductStock = require("../middlewares/updateProductStock");
const pushOrdersInPurchaeList = require("../middlewares/pushOrderInPurchaseList");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
  getAllOrdersById,
} = require("../controllers/order");

// params
router.param("userid", getUserById);
router.param("orderid", getOrderById);

// order routes

// create
router.post(
  "/order/create/:userid",
  isSignedIn,
  isAuthenticated,
  pushOrdersInPurchaeList,
  updateProductStock,
  createOrder
);

// get all orders - admin
router.get(
  "/order/all/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// get purchased orders - user
router.get(
  "/order/customer/all/:userid",
  isSignedIn,
  isAuthenticated,
  getAllOrdersById
);

// get status of orders
router.get(
  "/order/status/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

// update status of orders
router.put(
  "/order/:orderid/status/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
