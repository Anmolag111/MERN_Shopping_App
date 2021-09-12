import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-white text-dark text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-light text-white text-center py-3">
        <h4 className="text-dark">
          If you got any questions, feel free to rech out!
        </h4>
        <button
          href="mailto:contact@test.com"
          className="btn btn-secondary btn-lg"
        >
          <a
            id="contact"
            target="_blank"
            className="text-white"
            href="mailto:sahil.jamwal78625@gmail.com"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </button>
      </div>
      <div className="container text-center">
        <span className="text-muted ">
          Made By <span className="text-white ">TEAM</span> BrainMentors
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
