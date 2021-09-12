import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { emptyCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please add something to cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    console.log(info.instance);
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        console.log(nonce);

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData);
            emptyCart(() => {
              console.log("Did we got a crash?");
            });

            setReload(!reload);
          })
          .catch((error) => {
            setInfo({ loading: false, success: false });
            console.log("PAYMENT FAILED");
          });
      })
      .catch((err) => console.log(err));
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  return (
    <div>
      <h3 className="text-white">
        Your Billed Amount is &#x20b9; {getAmount()}
      </h3>
      {showBtnDropIn()}
    </div>
  );
};

export default PaymentB;
