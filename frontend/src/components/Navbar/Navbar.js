import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {

  const [hasToken, setHasToken] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    navigate("/Home");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (

    <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <motion.img
              src="images/learniq-logo.png"
              className="logo-img"
              alt="LearnIQ Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <motion.img
              src="images/learniqtext.png"
              className="logo-text"
              alt="LearnIQ Text"
            />
          </Link>
        </div>

        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>


        <nav className={`nav-section ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {hasToken && (
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/Quiz" className="nav-link">
                  Quiz
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Lecture" className="nav-link">
                  Lectures
                </Link>
              </li>
            </ul>
          )}

          <div className="auth-section">
            {hasToken ? (
              <motion.button
                className="logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <>
                <motion.button
                  className="login-btn"
                  onClick={() => navigate("/login")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  className="register-btn"
                  onClick={() => navigate("/register")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;