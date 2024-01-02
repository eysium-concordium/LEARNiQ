import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { motion } from "framer-motion";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      // console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <motion.div
          className="col-md-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 10 }}
        >
          <img
            src="images/education-transparent-background-21.png"
            className="img-fluid"
            alt="Education Image"
            height="450px"
            width="450px"
          />
        </motion.div>
        <div className="col-md-6">
          <div className="c1">
            <h1 className="mb-4">Login</h1>
            <p className="mb-4">Log in to continue</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="email"
                  placeholder="name@example.com"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <a className="float-end">Lost password?</a>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                  id="exampleInputPassword1"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-success btn-block"
              >
                Sign in
              </button>
            </form>
            <p className="mt-3">
              Not registered? <Link to="/Register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
