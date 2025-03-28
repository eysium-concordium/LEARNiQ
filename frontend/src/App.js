import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Lecture from "./pages/Lecture";
import Lectureyoutube from "./pages/Lectureyoutube";
import Quiz from "./pages/Quiz";
import Chatbot from "./pages/Chatbot";
import HomePage from "./pages/Home";


// PrivateRoute component to protect routes requiring authentication
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// AuthRoute component to prevent authenticated users from accessing login/register
const AuthRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? <Navigate to="/dashboard" /> : element;
};


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check authentication status when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login handler to set authentication state
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // Logout handler to clear authentication state
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (

    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Auth routes - redirect to dashboard if already logged in */}
        <Route path="/login" element={<AuthRoute element={<Login onLogin={handleLogin} />} />} />
        <Route path="/register" element={<AuthRoute element={<Register />} />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/lecture" element={<PrivateRoute element={<Lecture />} />} />
        <Route path="/lectureyoutube" element={<PrivateRoute element={<Lectureyoutube />} />} />
        <Route path="/quiz" element={<PrivateRoute element={<Quiz />} />} />
        
        {/* Fallback route for any undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

  );
}

export default App;