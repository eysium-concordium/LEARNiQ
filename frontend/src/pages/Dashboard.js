import { Link, Router, useNavigate, useParams } from "react-router-dom";
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
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import "../Styles/Dashboard.css";
import Navbar from "../components/Navbar/Navbar";
//import './images/learniq-login'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Dashboardfinal() {
  const [style1, setstyle1] = useState({
    color: "gold",
  });
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserID] = useState("");
  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = true;
    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getuser`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Response not OK");
          }
        })
        .then((data) => {
          setUserID(data._id);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error.message);
        });

      const fetchUserDetails = async () => {
        try {
          if (!token) {
            navigate("/login");
            return;
          }

          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/getuserdetails`,
            {
              method: "POST",
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div className="container cmain">
          <motion.div className="row item" variants={item}>
            <div className="container d2">
              <div className="row">
                <div className="col">
                  {" "}
                  <span className="t1">Dash</span>
                  <span className="t2">board</span>
                </div>
              </div>
              <div className="row c2">
                <div className="col-sm-4">
                  <div className="row">
                    <div className="col">
                      <span className="t3">Hello! </span>
                      <span className="t4">{userDetails.userName}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <span className="t5">Welcome to </span>
                      <span className="t6">LEARNiQ</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6"></div>
                <motion.div
                  className="col-sm-2"
                  animate={{ x: 100 }}
                  transition={{ ease: "easeOut", duration: 2 }}
                  whileHover={{
                    scale: 2,
                  }}
                >
                  <img
                    src="images/learniq-logo.png"
                    className="rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                  ></img>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <br></br>
          <div className="row">
            <motion.div className="col-sm-4 r4 item" variants={item}>
              <span className="sp2">My Courses</span>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-sm-6">
                  {userDetails.lectureTitles &&
                  userDetails.lectureTitles.length > 0 ? (
                    userDetails.lectureTitles.map((title, index) => (
                      <div key={index}>
                        {title}
                        <br />
                      </div>
                    ))
                  ) : (
                    <motion.div
                      className="no-courses-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h5>
                        Nothing to display. Explore and enroll in courses to get
                        started!
                      </h5>
                    </motion.div>
                  )}
                </div>
                {userDetails.lectureTitles &&
                  userDetails.lectureTitles.length > 0 && (
                    <div className="col-sm-4">
                      <button type="button" className="btn btn-outline-success">
                        View
                      </button>
                    </div>
                  )}
              </div>
            </motion.div>
            <div className="col-sm-1"></div>
            <motion.div
              className="col-sm-7 item"
              variants={item}
              onLoad={window.scrollTo(2, 2)}
            >
              <div className="row r4">
                <span className="sp2">My Achievements</span>
                <br></br>
                <br></br>
                <div className="row">
                  {userDetails.quizPoints >= 4000 ? (
                    <motion.div
                      className="col-sm-2"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%",
                      }}
                    >
                      <img
                        src="https://pixlok.com/wp-content/uploads/2021/04/Star-Clipart-PNG.jpg"
                        alt=""
                        className="im1 rounded-circle"
                      />
                    </motion.div>
                  ) : userDetails.quizPoints >= 3000 ? (
                    <motion.div
                      className="col-sm-2"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/256/7470/7470490.png"
                        alt=""
                        className="im1 rounded-circle"
                      />
                    </motion.div>
                  ) : userDetails.quizPoints >= 2000 ? (
                    <motion.div
                      className="col-sm-2"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/256/7602/7602899.png"
                        alt=""
                        className="im1 rounded-circle"
                      />
                    </motion.div>
                  ) : userDetails.quizPoints >= 1000 ? (
                    <motion.div
                      className="col-sm-2"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/256/6811/6811291.png"
                        alt=""
                        className="im1 rounded-circle"
                      />
                    </motion.div>
                  ) : (
                    <div className="col-sm-2" style={{ pointerEvents: "none" }}>
                      {/* No animation if points are less */}
                      <img
                        src="https://cdn-icons-png.flaticon.com/256/6000/6000896.png"
                        alt=""
                        className="im1 rounded-circle"
                      />
                    </div>
                  )}
                  <div className="col-sm-1"></div>
                </div>
              </div>
              <br></br>
              <div className="row ro1">
                <div className="col-sm-6">
                  <span className="sp2" style={{ color: "#F5F5F4" }}>
                    {" "}
                    {userDetails.quizPoints * 100}{" "}
                  </span>
                  <span className="sp2" style={style1}>
                    {" "}
                    X
                  </span>
                  <span className="sp2">p</span>
                </div>
                <div className="col-sm-6"></div>
              </div>
              <br></br>
              <div className="row ro1">
                <button type="button" className="btn btn-outline-success">
                  Reedem
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
