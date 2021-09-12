import React from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import Base from "../core/Base";
const UserDashBoard = () => {
  const {
    user: { fname, email },
  } = isAuthenticated();
  const message = `Welcome ${fname} to User Dashboard`;
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/dashboard" className="nav-link text-success">
              Account Details
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/user/dashboard/security"
              className="nav-link text-success"
            >
              Account Security
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/dashboard/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {fname}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base title={message} className="container bg-light p-4">
      <h3 className="">Account</h3>
      <div className="row">
        <div className="col-xs-3">{adminLeftSide()}</div>
        <div className="col-sm-9 my-2">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
