import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createaProduct, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [{}],
    category: "",
    loading: false,
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories()
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values });
          setError(data.error);
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      })
      .catch((err) => console.log("error fetching categories"));
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setError(data.error);
        setValues({ ...values });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
        setSuccess(true);
        setError(false);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    if (success) {
      return (
        <div
          className="alert alert-success mt-3 "
          role="alert"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4>{createdProduct} created successfully</h4>
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div
          className="alert alert-danger mt-3 "
          role="alert"
          style={{ display: error ? "" : "none" }}
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4>{error}</h4>
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-secondary p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-sm-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
