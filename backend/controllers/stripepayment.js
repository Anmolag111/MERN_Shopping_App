require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;

  let amount = 0;
  products.map((product) => {
    amount += product.price;
  });

  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          {
            idempotencyKey,
          }
        )
        .then((result) =>
          res.status(200).json({
            result,
            success: "Payment Successful!",
          })
        )
        .catch((err) => {
          logger.debug("encountered error while payment", err);
          res.status(400).json({ error: err.message });
        })
        .catch((err) => {
          logger.debug("encountered error while payment", err);
          res.status(400).json({ error: "Error in processing your payment!" });
        });
    });
};
