import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Styles/Dashboard.css";

// Enhanced animations
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.5 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const badgeMap = [
  { threshold: 4000, image: "https://pixlok.com/wp-content/uploads/2021/04/Star-Clipart-PNG.jpg", alt: "Gold Star Badge", color: "#FFD700" },
  { threshold: 3000, image: "https://cdn-icons-png.flaticon.com/256/7470/7470490.png", alt: "Silver Badge", color: "#C0C0C0" },
  { threshold: 2000, image: "https://cdn-icons-png.flaticon.com/256/7602/7602899.png", alt: "Bronze Badge", color: "#CD7F32" },
  { threshold: 1000, image: "https://cdn-icons-png.flaticon.com/256/6811/6811291.png", alt: "Starter Badge", color: "#4CAF50" },
  { threshold: 0, image: "https://cdn-icons-png.flaticon.com/256/6000/6000896.png", alt: "No Badge", color: "#9E9E9E" }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    lectureTitles: [],
    quizPoints: 0,
  });
  const [activeSection, setActiveSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const detailsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/dashboard/getuserdetails`, {
          method: "POST",
          headers: { Authorization: token },
        });
        if (!detailsResponse.ok) throw new Error("Failed to fetch user details");
        const details = await detailsResponse.json();
        setUserDetails(details);
        
        // Simulate loading for smoother transitions
        setTimeout(() => setIsLoading(false), 600);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const getUserBadge = () => {
    for (const badge of badgeMap) {
      if (userDetails.quizPoints >= badge.threshold) {
        return badge;
      }
    }
    return badgeMap[badgeMap.length - 1];
  };

  const currentBadge = getUserBadge();
  const hasAnimatedBadge = userDetails.quizPoints >= 1000;
  const progressPercentage = Math.min(100, (userDetails.quizPoints % 1000) / 10);
  const pointsToNextLevel = 1000 - (userDetails.quizPoints % 1000);

  // Sample data for progress chart
  const progressData = [
    { month: 'Jan', points: Math.floor(Math.random() * 1000) },
    { month: 'Feb', points: Math.floor(Math.random() * 1000) },
    { month: 'Mar', points: Math.floor(Math.random() * 1000) },
    { month: 'Apr', points: userDetails.quizPoints * 100 },
  ];

  return (
    <motion.div 
      className="dashboard-container a"
      variants={containerAnimation} 
      initial="hidden" 
      animate="visible"
    >
      {isLoading ? (
        <motion.div 
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="spinner"></div>
          <p>Loading your personalized dashboard...</p>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="dashboard-header" 
            variants={itemAnimation}
            whileHover={{ scale: 1.01 }}
          >
            <h1 className="dashboard-title">
              <motion.span 
                className="title-primary"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Dash
              </motion.span>
              <motion.span 
                className="title-secondary"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                board
              </motion.span>
            </h1>
          </motion.div>

          <div className="dashboard-content">
            <motion.div 
              className="user-info" 
              variants={itemAnimation}
              whileHover={{ 
                boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)" 
              }}
            >
              <h2>
                Hello, <motion.span 
                  className="user-name"
                  initial={{ color: "#333" }}
                  animate={{ color: "#1e88e5" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  {userDetails.userName}
                </motion.span>!
              </h2>
              <p>Welcome to <span className="brand-name">LEARNiQ</span></p>
            </motion.div>

            <div className="dashboard-grid">
              <motion.div 
                className="card course-section" 
                variants={itemAnimation}
                whileHover={{ y: -5, boxShadow: "0 12px 20px rgba(0,0,0,0.1)" }}
                onMouseEnter={() => setActiveSection("courses")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="card-header">
                  <h3>
                    <motion.span 
                      animate={{ 
                        scale: activeSection === "courses" ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      My Courses
                    </motion.span>
                  </h3>
                </div>
                <div className="card-body">
                  {userDetails.lectureTitles.length ? (
                    <motion.ul className="course-list">
                      {userDetails.lectureTitles.map((title, index) => (
                        <motion.li 
                          key={index} 
                          className="course-item"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            x: 5, 
                            color: "#1e88e5",
                            backgroundColor: "rgba(30, 136, 229, 0.05)"
                          }}
                        >
                          {title}
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.div 
                      className="no-courses"
                      variants={fadeIn}
                    >
                      <p>No courses enrolled. Start your learning journey today!</p>
                      <motion.button 
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Courses
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div 
                className="card achievements-section" 
                variants={itemAnimation}
                whileHover={{ y: -5, boxShadow: "0 12px 20px rgba(0,0,0,0.1)" }}
                onMouseEnter={() => setActiveSection("achievements")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="card-header">
                  <h3>
                    <motion.span 
                      animate={{ 
                        scale: activeSection === "achievements" ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      My Achievements
                    </motion.span>
                  </h3>
                </div>
                <div className="card-body achievement-content">
                  <div className="badge-container">
                    {hasAnimatedBadge ? (
                      <motion.div
                        className="badge-wrapper"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9, rotate: -5 }}
                        animate={{ 
                          y: [0, -10, 0],
                          rotateZ: [0, 5, 0, -5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      >
                        <img src={currentBadge.image} alt={currentBadge.alt} className="achievement-badge" />
                        <motion.div 
                          className="badge-glow"
                          animate={{ 
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ backgroundColor: currentBadge.color }}
                        />
                      </motion.div>
                    ) : (
                      <img src={currentBadge.image} alt={currentBadge.alt} className="achievement-badge" />
                    )}
                  </div>
                  <div className="points-display">
                    <motion.div 
                      className="points-value-container"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span 
                        className="points-value"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {userDetails.quizPoints * 100} XP
                      </motion.span>
                    </motion.div>

                    <div className="progress-container">
                      <motion.div 
                        className="circular-progress"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <CircularProgressbar
                          value={progressPercentage}
                          text={`${progressPercentage}%`}
                          styles={buildStyles({
                            textSize: '16px',
                            pathColor: currentBadge.color,
                            textColor: currentBadge.color,
                            trailColor: '#eee',
                            pathTransition: 'stroke-dashoffset 0.5s ease 0s',
                          })}
                        />
                      </motion.div>
                      <div className="progress-text">
                        <p>{userDetails.quizPoints < 4000 ? 
                          `${pointsToNextLevel} points to next level!` : 
                          "Maximum level reached!"}
                        </p>
                      </div>
                    </div>

                    <motion.button 
                      className="btn btn-outline-success redeem-btn"
                      whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Redeem Points
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="card progress-section" 
                variants={itemAnimation}
                whileHover={{ y: -5, boxShadow: "0 12px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="card-header">
                  <h3>My Progress</h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="points" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}