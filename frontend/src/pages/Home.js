import React from "react";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css"; // You'll need to create this CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Learning Journey</h1>
          <p className="hero-subtitle">
            Interactive courses, personalized feedback, and cutting-edge tools
            to elevate your educational experience
          </p>
          <Link to="/dashboard">
            <button className="cta-button">Explore Platform</button>
          </Link>
        </div>
        <div className="hero-graphics">
          <div className="animated-shape shape-1"></div>
          <div className="animated-shape shape-2"></div>
          <div className="animated-shape shape-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Our Platform</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Expert-Led Courses</h3>
            <p>Learn from industry professionals with real-world experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Accelerated Learning</h3>
            <p>Our proven methodology helps you master concepts faster</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Adaptive Content</h3>
            <p>Personalized learning paths that evolve with your progress</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Student Success Stories</h2>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "This platform completely transformed how I approach learning. The interactive
              lectures and quizzes made complex topics easy to understand."
            </p>
            <p className="testimonial-author">— Alex Johnson, Software Engineer</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <p className="copyright">Crafted with ❤️ by Harsh</p>
          <div className="social-links">
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">💻</a>
            <a href="#" className="social-icon">📧</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;