import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const [message, setMessage] = useState("");

  const { user, token } = isAuthenticated();

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="lead">Enter the category</label>
        <input
          type="text"
          id="lead"
          className="form-control my-3"
          autoFocus
          required
          placeholder="for Ex. Summer"
          onChange={handleChange}
        />
        <button onClick={onSubmit} className="btn btn-outline-success">
          Create Category
        </button>
      </div>
    </form>
  );

  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-info my-2">
          <h4 className="text-success">{message}</h4>
        </div>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger my-2">
          <h4 className="text-danger">{message}</h4>
        </div>
      );
    }
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setsuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
        setMessage(data.error);
      } else {
        setError(false);
        setMessage(data.success);
        setsuccess(true);
        setName("");
      }
    });
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new T-Shirts"
      className="container bg-secondary p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-white rounded">
        <div className="col-sm-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
