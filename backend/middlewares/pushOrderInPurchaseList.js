const userCrud = require("../db/helpers/usercrud");
const logger = require("../utils/logger");

const pushOrdersInPurchaseList = async (req, res, next) => {
  let purchases = [];
  const { amount, transaction_id } = req.body.order;
  req.body.order.products.forEach((product) => {
    const { _id, name, description, category } = product;
    purchases.push({
      _id,
      name,
      description,
      category,
      quantity: 1,
      amount,
      transaction_id,
    });
  });
  try {
    await userCrud.updateProductList(req.profile._id, purchases);
  } catch (err) {
    logger.debug("error in push purchase route", err);
    return res
      .status(400)
      .json({ error: "error addding item in purchase list" });
  }

  next();
};

module.exports = pushOrdersInPurchaseList;
