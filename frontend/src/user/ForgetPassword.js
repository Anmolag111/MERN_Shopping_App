import React, { useState } from "react";
import Base from "../core/Base";
import { forgetPassword } from "./helper/userapicalls";
const ForgetPassword = () => {
  const [values, setValues] = useState({
    email: "",
    success: false,
    error: false,
    message: "",
    loading: false,
  });
  const { email, error, success, message, loading } = values;
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
    forgetPassword({ email }).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          message: data.error,
          error: true,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          email: "",
          message: data.success,
          error: false,
          loading: false,
          success: true,
        });
      }
    });
  };

  const forgotPassForm = () => {
    return (
      <div className="row  mb-5">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <div className="form-group p-3">
              <label htmlFor="email" className="text-dark">
                Email:{" "}
              </label>
              <input
                className="form-control"
                placeholder="Enter Registered Email"
                onChange={handleChange("email")}
                value={email}
                id="email"
                type="email"
                autoFocus
              />
            </div>
            <center>
              <button
                onClick={onSubmit}
                className="btn btn-success text-center"
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Forget Password Page"
      className="container bg-light p-5"
      description="Recover your password from here"
    >
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      {forgotPassForm()}
    </Base>
  );
};

export default ForgetPassword;
