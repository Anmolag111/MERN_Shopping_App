const gateway = require("../utils/payment");

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction
    .sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
};

exports.getToken = (req, res) => {
  gateway.clientToken
    .generate({})
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
