import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const HomePage = () => {
  return (
    <div>
      <div className="colored-section" id="title">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1
                className="big-heading"
                style={{
                  fontFamily: "Montserrat-Black",
                  fontSize: "3.5rem",
                  lineHeight: 1.5,
                  color: "#fff",
                  padding: "3% 15% 7%",
                }}
              >
                Make Your Learning Experience Better With Us.
              </h1>
              <div style={{ padding: "3% 15% 7%" }}>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg download-button"
                    style={{ margin: "5% 3% 5% 0" }}
                  >
                    <i className="fab fa-apple"></i> Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg download-button"
                    style={{ margin: "5% 3% 5% 0" }}
                  >
                    <i className="fab fa-google-play"></i> SignUp
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="white-section" id="footer">
        <div className="container-fluid">
          <p
            style={{
              alignItems: "center",
              lineHeight: 1.5,
              color: "yellow",
              padding: "0% 40% 30%",
            }}
          >
            Developed by Harsh
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
