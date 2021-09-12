import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { autheticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    isRedirect: false,
  });
  const { email, password, error, loading, isRedirect } = values;
  const user = isAuthenticated();

  const handleChange = (user) => (event) => {
    setValues({ ...values, error: false, [user]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if ( data && data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        autheticate(data, () => {
          setValues({ ...values, isRedirect: true });
        });
      }
    });
  };

  const performRedirect = () => {
    if (isRedirect) {
      if (user && user.user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () =>
    loading && (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-info">
            <h2>Loading...</h2>
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left bg-white rounded">
          <form>
            <div className="form-group pt-2">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                placeholder="enter email"
                onChange={handleChange("email")}
                value={email}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                className="form-control"
                placeholder="enter password"
                onChange={handleChange("password")}
                value={password}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
            <p className="text-right"><Link to="/forgetPassword">ForgetPassword</Link></p>
          </form>
          
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
