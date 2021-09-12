const mongoose = require("../connection");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 64,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 32,
      trim: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categoryModel",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
