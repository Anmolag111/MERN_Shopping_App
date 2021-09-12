const { API } = require("../../backend");

export const getProducts = () => {
  return fetch(`${API}/products`)
    .then((response) => response.json())
    .catch((err) => console.log("cant fetch products"));
};
