import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base
      title="Cart Page"
      description="Checkout all the products added to cart"
    >
      <div className="row ">
        <div className="col-md-6">
          {products.length > 0 ? (
            loadAllProducts()
          ) : (
            <Fragment>
              <img
                className="img-fluid"
                src={require("./images/cart.png")}
                alt="empty-cart"
              />
            </Fragment>
          )}
        </div>
        <div className="col-md-6">
          {products.length > 0 ? (
            <StripeCheckout products={products} setReload={setReload} />
          ) : (
            <h3 className="text-white">Add Products in your cart first</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
