const orderModel = require("../schemas/order");

const orderCrud = {
  getPurchaseList(userid) {
    let promise = new Promise((resolve, reject) => {
      orderModel
        .find({ user: userid })
        .populate("userModel", "_id name")
        .exec((err, order) => {
          if (!order || err) {
            reject(new Error("No orders in this account"));
          }
          resolve(order);
        });
    });
    return promise;
  },
  getOrderById(orderid) {
    let promise = new Promise((resolve, reject) => {
      orderModel
        .findById({ _id: orderid })
        .populate("products.product", "name price")
        .exec((err, order) => {
          if (err || !order) {
            reject(new Error("no such order in our DB"));
          }
          resolve(order);
        });
    });
    return promise;
  },
  createOrder(order) {
    return orderModel.create(order);
  },
  getAllOrders() {
    let promise = new Promise((resolve, reject) => {
      orderModel
        .find()
        .populate("userModel", "_id fname lname")
        .exec((err, order) => {
          if (err || !order) {
            reject(new Error("no orders are available!"));
          }
          resolve(order);
        });
    });
    return promise;
  },
  getOrderStatus() {
    return orderModel.schema.path("status").enumValues;
  },
  updateOrderStatus(orderid, orderStatus) {
    let promise = new Promise((resolve, reject) => {
      orderModel.findByIdAndUpdate(
        { _id: orderid },
        { status: orderStatus },
        { new: true },
        (err, order) => {
          if (err || !order) {
            reject(new Error(`no order with this id ${orderid}`));
          }
          resolve(order);
        }
      );
    });
    return promise;
  },
};

module.exports = orderCrud;
