import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const NotFound = () => {
  return (
    <Fragment>
      <div id="notFound" className=" row ">
        <div className="col-sm-12 ">
          <img
            src={require("./404.svg")}
            className="img-fluid"
            height="400px"
            width="400px"
            alt="404"
          />
        </div>
        <div className="col-sm-12">
          {" "}
          <button className="btn btn-light my-2">
            <Link id="contact" to="/">
              Back to Home
            </Link>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
