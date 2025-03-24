import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Register.css"; // We'll create this file next

function Register() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Added for better UX
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check password strength
  useEffect(() => {
    const { password } = credentials;
    let strength = 0;
    
    if (password.length > 6) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    
    setPasswordStrength(strength);
  }, [credentials.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const { name, email, password, confirmPassword } = credentials;
    
    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`,
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
      
      if (!response.ok) {
        throw new Error(json.error || "Failed to register");
      }

      localStorage.setItem("token", json.authtoken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering:", error);
      setError(error.message || "Something went wrong. Please try again.");
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
    <div className="register-container">
      <div className="register-wrapper">
        <motion.div 
          className="register-illustration"
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
              className="floating-pencil"
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
              <img src="/images/pencil-icon.svg" alt="Pencil" />
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
            alt="Education Illustration"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>

        <motion.div 
          className="register-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="register-title"
            variants={itemVariants}
          >
            Begin Your Learning Journey
          </motion.h1>
          
          <motion.p 
            className="register-subtitle"
            variants={itemVariants}
          >
            Join LearnIQ today and unlock your potential
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
            className="register-form"
            variants={containerVariants}
          >
            <motion.div 
              className="form-group"
              variants={itemVariants}
            >
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
              </div>
            </motion.div>
            
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
                  placeholder="Create a strong password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="password-strength">
                <div className="strength-meter">
                  <div 
                    className={`strength-progress strength-${passwordStrength}`} 
                    style={{ width: `${passwordStrength * 25}%` }}
                  ></div>
                </div>
                <span className="strength-text">
                  {passwordStrength === 0 && "Enter password"}
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Fair"}
                  {passwordStrength === 3 && "Good"}
                  {passwordStrength === 4 && "Strong"}
                </span>
              </div>
            </motion.div>
            
            <motion.div 
              className="form-group"
              variants={itemVariants}
            >
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={credentials.confirmPassword}
                  onChange={onChange}
                  required
                />
              </div>
            </motion.div>
            
            <motion.button 
              type="submit" 
              className="register-button"
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
                "Start Learning Now"
              )}
            </motion.button>
          </motion.form>
          
          <motion.p 
            className="login-link"
            variants={itemVariants}
          >
            Already on the learning path? <Link to="/login">Sign In</Link>
          </motion.p>
          
          <motion.div 
            className="learning-badges"
            variants={itemVariants}
          >
            <div className="badge">
              <i className="fas fa-award"></i>
              <span>Earn Badges</span>
            </div>
            <div className="badge">
              <i className="fas fa-chart-line"></i>
              <span>Track Progress</span>
            </div>
            <div className="badge">
              <i className="fas fa-users"></i>
              <span>Join Community</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;