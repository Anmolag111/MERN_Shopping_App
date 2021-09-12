const productCrud = require("../db/helpers/productCrud");
const logger = require("../utils/logger");

const updateProductStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });
  let promise = productCrud.updateProductInventory(myOperations);
  promise
    .then((products) => {})
    .catch((err) => {
      logger.debug("error in updateProductStock ", err);
      res.status(400).json({ error: "could not update product stock" });
    });
  next();
};

module.exports = updateProductStock;
