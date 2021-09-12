const mongoose = require("../connection");
const Schema = mongoose.Schema;

const productCartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "productModel",
    },
    name: String,
    count: Number,
    price: Number,
  },
  { timestamps: true }
);

// const productCartModel = mongoose.model("productCarts", productCartSchema);
module.exports = productCartSchema;
