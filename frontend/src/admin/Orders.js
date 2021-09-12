import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const loadOrders = () => {
    getAllOrders(userId, token)
      .then((data) => {
        if (data && data.error) {
          setError(true);
          setSuccess(false);
        } else {
          setError(false);
          setSuccess(true);
          setOrders(data);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="row">
        <div className="col-xs-12 offset-sm-2 text-left ">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div className="list-group my-2" key={index}>
                <div className="list-group-item list-group-item-action flex-column align-items-start ">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Order ID: {order._id}</h5>
                    <small className="px-2">
                      Ordered{" "}
                      <span className="text-danger">
                        {parseInt(
                          (Date.now() - new Date(order.createdAt)) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </span>{" "}
                      days ago.
                    </small>
                  </div>
                  <p className="mb-1 text-info">
                    Order Amount: &#x20b9;{order.amount}
                  </p>
                  <p className="mb-1">Ordered Items: {order.products.length}</p>
                  {order.products.map((product, index) => (
                    <p className="mb-1 " key={index}>
                      Product {index + 1}: {product.name}
                    </p>
                  ))}
                  <small className="d-block">
                    UserID Associated:{" "}
                    <span className="text-success ">{order.user}.</span>
                  </small>
                  <small>
                    Order Status:{" "}
                    <span className="text-success">{order.status}.</span>
                  </small>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-danger">
              <h3 className="text-danger">
                No Orders Available in the Order Table
              </h3>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Manage Orders Page"
      description="Manage all user Orders Here "
      className="container bg-light p-4"
    >
      <h3 className="">Account</h3>
      <div className="row">
        <div className="col-sm-3">{adminLeftSide()}</div>
        <div className="col-sm-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default Orders;
