const mongoose = require("../connection");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      maxlength: 32,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
