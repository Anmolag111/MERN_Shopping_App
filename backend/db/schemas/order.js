const mongoose = require("../connection");
const Schema = mongoose.Schema;
const ProductCartSchema = require("./productCart");

const orderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: {},
    updated: Date,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Received", "Delivered", "Shipped", "Processing"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
