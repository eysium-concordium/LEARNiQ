import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="colored-section" id="title" style={{width:"100vw", height:"100vh"}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1
                className="font-bold w-full h-[70%] font-xl text-white px-10 py-5"
              >
                Make Your Learning Experience Better With Us.
              </h1>
              <div style={{ padding: "5% 10%", display: "flex", alignItems:"center", gap:"20px" }}>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg download-button"
                    style={{  }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg download-button"
                    style={{  }}
                  >
                    SignUp
                  </button>
                </Link>
              </div>
            </div>
                <Link to="/chat">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg download-button"
                    style={{ }}
                  >
                    USE CHATBOT
                  </button>
                </Link>
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
