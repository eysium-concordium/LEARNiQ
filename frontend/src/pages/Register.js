import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { motion } from "framer-motion";
function Register() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const json = await response.json();
      // console.log(json);

      localStorage.setItem("token", json.authtoken);
      navigate("/dashboard");
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
            height="650px"
            width="450px"
          />
        </motion.div>
        <div className="col-md-6">
          <div className="c1">
            <h1 className="mb-4">Sign Up</h1>
            <p className="mb-4">Sign Up to continue</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your full name"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
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
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            </form>
            <p className="mt-3">
              Registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
