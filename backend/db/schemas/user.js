const mongoose = require("../connection");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
