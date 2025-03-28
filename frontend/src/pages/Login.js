import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Login.css"; // You'll need to create this CSS file

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <motion.div 
          className="login-illustration"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="floating-elements">
            <motion.div 
              className="floating-book"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img src="/images/book-icon.svg" alt="Book" />
            </motion.div>
            
            <motion.div 
              className="floating-graduation"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 3.5,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img src="/images/graduation-cap.svg" alt="Graduation Cap" />
            </motion.div>
            
            <motion.div 
              className="floating-bulb"
              animate={{ 
                y: [0, -20, 0],
                filter: ["drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))", "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))", "drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))"]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img src="/images/bulb-icon.svg" alt="Light Bulb" />
            </motion.div>
          </div>
          
          <motion.img
            src="/images/education-transparent-background-21.png"
            className="main-illustration"
            alt="Learning Illustration"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>

        <motion.div 
          className="login-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="login-title"
            variants={itemVariants}
          >
            Welcome Back!
          </motion.h1>
          
          <motion.p 
            className="login-subtitle"
            variants={itemVariants}
          >
            Continue your learning journey with LearnIQ
          </motion.p>
          
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <motion.form 
            onSubmit={handleSubmit}
            className="login-form"
            variants={containerVariants}
          >
            <motion.div 
              className="form-group"
              variants={itemVariants}
            >
              <label htmlFor="email">Email address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="form-group"
              variants={itemVariants}
            >
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </motion.div>
            
            <motion.button 
              type="submit" 
              className="login-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.form>
          
          <motion.p 
            className="register-link"
            variants={itemVariants}
          >
            New to LearnIQ? <Link to="/register">Create Account</Link>
          </motion.p>
          
          <motion.div 
            className="login-badges"
            variants={itemVariants}
          >
            <div className="badge">
              <i className="fas fa-laptop"></i>
              <span>Resume Learning</span>
            </div>
            <div className="badge">
              <i className="fas fa-certificate"></i>
              <span>Get Certified</span>
            </div>
            <div className="badge">
              <i className="fas fa-brain"></i>
              <span>Expand Knowledge</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;