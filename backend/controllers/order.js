const orderCrud = require("../db/helpers/orderCrud");
const logger = require("../utils/logger");
const sendMail = require("../utils/mail");

exports.getOrderById = async (req, res, next, id) => {
  try {
    const order = await orderCrud.getOrderById(id);
    req.order = order;
  } catch (err) {
    logger.debug("error in getOrderByID ", err);
    res.status(400).json({
      error: "no such order!",
    });
  }

  next();
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  let promise = orderCrud.createOrder(req.body.order);
  promise
    .then((order) => {
      const data = {
        fname: req.profile.fname,
        _id: order._id,
        email: req.profile.email,
      };
      sendMail(data.email, "order-confirmation", null, data);
      res.status(201).json(order);
    })
    .catch((err) => {
      logger.debug("error in ordercreate Route", err);
      res.status(400).json({
        erro: "error generating order!",
      });
    });
};

exports.getAllOrders = (req, res) => {
  let promise = orderCrud.getAllOrders();
  promise
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      logger.debug("error in order routes!", err);
      res.status(400).json({
        error: "No orders are available!",
      });
    });
};

exports.getOrderStatus = (req, res) => {
  const orderStatus = orderCrud.getOrderStatus();
  res.status.json(orderStatus);
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderid, status } = req.body;
    const order = await orderCrud.updateOrderStatus(orderid, status);
    res.status(200).json(order);
  } catch (err) {
    logger.debug("error in update ordr status route", err);
    res.status(400).json({ error: "error updating status" });
  }
};

exports.getAllOrdersById = (req, res) => {
  const { _id } = req.profile;
  let promise = orderCrud.getPurchaseList(_id);
  promise
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      logger.debug("caught error in fetching Product List", err);
      res.status(400).json({
        error: "Error in fetching Your orders Please refresh the Page!",
      });
    });
};
