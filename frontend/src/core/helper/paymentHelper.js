const { API } = require("../../backend");

export const getMeToken = (userId, token) => {
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentInfo) => {
  console.log(paymentInfo);
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayments = (userId, jwtToken, paymentInfo) => {
  console.log(paymentInfo);
  return fetch(`${API}/stripepayment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
