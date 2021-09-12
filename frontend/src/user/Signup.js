import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    error: "",
    success: false,
  });

  const { fname, lname, email, pass, error, success } = values;

  const handleChange = (user) => (event) => {
    setValues({ ...values, error: false, [user]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ fname, lname, email, pass })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            fname: "",
            lname: "",
            email: "",
            pass: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("error in signup form"));
  };

  const signUpForm = () => {
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left bg-white rounded pb-3">
          <form>
            <div className="form-group pt-2">
              <label className="text-dark">First Name</label>
              <input
                className="form-control"
                onChange={handleChange("fname")}
                placeholder="Enter first name"
                type="text"
                value={fname}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lname")}
                placeholder="Enter last name"
                type="text"
                value={lname}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                placeholder="enter email"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                className="form-control"
                onChange={handleChange("pass")}
                placeholder="enter password"
                type="password"
                value={pass}
                required
              />
            </div>
            <button className="btn btn-success btn-block " onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left ">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New Account was created SuccessFully!{" "}
          <Link to="/signin">Login Here!</Link>
        </div>
      </div>
    </div>
  );
  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
