export const addItemToCart = (item, next) => {
  let cart = [];
  if (window) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  }
  return [];
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (window) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (window) {
    localStorage.removeItem("cart");
    next();
  }
};
