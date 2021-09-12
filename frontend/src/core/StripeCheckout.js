import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import StripeCheckoutButton from "react-stripe-checkout";
import { STRIPE_KEY } from "../backend";
import { processPayments } from "./helper/paymentHelper";
import { emptyCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: false,
    address: "",
    message: "",
  });
  const { loading, success, error, address, message } = data;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const jwtToken = isAuthenticated() && isAuthenticated().token;

  const getTotalAmount = () => {
    let amount = 0;
    products.map((product) => {
      return (amount += product.price);
    });
    return amount;
  };

  const makePayment = (token) => {
    processPayments(userId, jwtToken, { token, products })
      .then((response) => {
        //call further methods
        setData({
          ...data,
          error: false,
          loading: false,
          success: true,
          message: response.success,
        });
        const orderData = {
          products: products,
          transaction_id: response.result.id,
          amount: response.result.amount / 100,
          address: response.result.billing_details.address,
          user: userId,
        };
        createOrder(userId, jwtToken, orderData);
        emptyCart(() => {});

        setReload(!reload);
      })
      .catch((err) => {
        setData({
          ...data,
          error: true,
          message: err.message,
          loading: false,
          success: false,
        });
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={STRIPE_KEY}
        token={makePayment}
        amount={getTotalAmount()}
        name="Buy T-Shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn d-block mx-auto my-2 btn-success text-center">
          Pay with stripe
        </button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Add Items to your Cart</button>
      </Link>
    );
  };
  return (
    <div className="mx-auto">
      <h3 className="text-center text-white">
        Your Billed Amount is &#x20b9; {getTotalAmount()} {showStripeButton()}
      </h3>
    </div>
  );
};

export default StripeCheckout;
