import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const createCategoryForm = () => (
    <form>
      <div className="form-group my-2">
        <input
          onChange={handleChange}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-3"
      >
        Update Category
      </button>
    </form>
  );

  useEffect(() => {
    const preload = (categoryId) => {
      getCategory(categoryId).then(({ name }) => {
        setName(name);
      });
    };
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setsuccess(false);

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setsuccess(true);
          setName(data.name);
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-info my-2">
          <h4 className="text-success">Category updated successfully</h4>
        </div>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to update category</h4>;
    }
  };

  return (
    <Base
      title="Update a category here!"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
