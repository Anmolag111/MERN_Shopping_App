import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div className="sticky-top">
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link to="/" style={currentTab(history, "/")} className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/cart"
          style={currentTab(history, "/cart")}
          className="nav-link"
        >
          Cart
        </Link>
      </li>
      {isAuthenticated() &&
        (isAuthenticated().user.role === 1 ||
          isAuthenticated().user.role === 0) && (
          <li className="nav-item">
            <Link
              to="/user/dashboard"
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
        )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            to="/admin/dashboard"
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
          >
            A. Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              to="/signup"
              style={currentTab(history, "/signup")}
              className="nav-link"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signin"
              style={currentTab(history, "/signin")}
              className="nav-link"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
