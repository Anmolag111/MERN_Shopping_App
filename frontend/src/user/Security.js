import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { resetPassword } from "./helper/userapicalls";
const Security = () => {
  const [values, setValues] = useState({
    confirmpassword: "",
    password: "",
    message: "",
    error: false,
    success: false,
    loading: false,
  });
  const {
    confirmpassword,
    password,
    message,
    error,
    success,
    loading,
  } = values;
  const { email } = isAuthenticated().user;

  const handleChange = (user) => (event) => {
    setValues({ ...values, error: false, [user]: event.target.value });
  };
  const errorMessage = () =>
    error && (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger">{message}</div>
        </div>
      </div>
    );

  const loadingMessage = () =>
    loading && (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-info">{message}</div>
        </div>
      </div>
    );

  const successMessage = () =>
    success && (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success">{message}</div>
        </div>
      </div>
    );
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    resetPassword({ confirmpassword, password, email })
      .then((data) => {
        if (data && data.error) {
          setValues({
            ...values,
            message: data.error,
            error: true,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            confirmpassword: "",
            password: "",
            message: data.success,
            error: false,
            success: true,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setValues({
          ...values,
          error: true,
          message: "Your request could not be processed. Please try again.",
        });
      });
  };
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
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label htmlFor="password" className="text-dark">
                Password
              </label>
              <input
                className="form-control"
                placeholder="Enter Password"
                onChange={handleChange("password")}
                value={password}
                id="password"
                type="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-pass" className="text-dark">
                Confirm Password
              </label>
              <input
                className="form-control"
                placeholder="Confirm Password"
                onChange={handleChange("confirmpassword")}
                value={confirmpassword}
                id="confirm-pass"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Security Page" className="container bg-light p-4">
      <h3 className="">Account</h3>

      <div className="row">
        <div className="col-sm-3">{adminLeftSide()}</div>
        <div className="col-sm-9">
          {errorMessage()}
          {successMessage()}
          {loadingMessage()}
          {adminRightSide()}
        </div>
      </div>
    </Base>
  );
};

export default Security;
