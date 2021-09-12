import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A photo from pexel";
  const cardDescription = product
    ? product.description
    : "A T-shirt from the store";
  const cardPrice = product ? product.price : "DEFAULT";

  const addItemInCart = (redirect) => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={addItemInCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className=" card text-dark bg-white border border-secondary ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body h-50">
        {getARedirect(redirect)}
        <ImageHelper product={product} className="h-50"/>
        <p className="lead bg-secondary text-white font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          &#x20b9; {cardPrice}{" "}
        </p>
        <div className="row">
          <div className="col-sm-12">{showAddToCart()}</div>
          <div className="col-sm-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
