const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const DB_URL = process.env.DATABASE_PROD;

const DB_OPTIONS = {
  poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(DB_URL, DB_OPTIONS)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => logger.debug("caught some error on route", err));

module.exports = mongoose;
