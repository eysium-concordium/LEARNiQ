import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import icons
import "../Styles/Lecturecss.css";

export default function Lecture() {
  const [lectures, setLectures] = useState([]); // Fetch from YouTube API
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch Lectures from YouTube API
  const fetchLectures = async (query) => {
    if (!query.trim()) {
      setError("Please enter a search term");
      setLectures([]); // Clear previous results when the search is empty
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyDGwAduyewmSxfB3qxIlWojnaAdd0CU4bo",
          q: query,
          part: "snippet",
          type: "video", // Fetch videos instead of playlists
          maxResults: 10,
        },
      });

      setLectures(response.data.items || []);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      setError("Failed to fetch lectures. Try again.");
      setLectures([]); // Clear results in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Search Form Submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchLectures(search);
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1, // Stagger the children's animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring", // Add spring effect
        stiffness: 80, // Adjust stiffness
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="lecture-container a"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="search-section"
        variants={itemVariants} // Apply variants to individual sections
      >
        <form onSubmit={handleSubmit} className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search for lectures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Searching...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSearch} /> Search
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.p
          className="error-message"
          variants={itemVariants} // Apply variants to the error message
        >
          {error}
        </motion.p>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          className="loading-indicator"
          variants={itemVariants} // Apply variants to the loading indicator
        >
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Loading lectures...</p>
        </motion.div>
      )}

      {/* Display Lectures */}
      <div className="lecture-list">
        <AnimatePresence>
          {lectures.map((lecture) => (
            <motion.div
              key={lecture.id.videoId}
              className="lecture-card"
              variants={itemVariants}
              whileHover="hover"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <Link to={`/Lectureyoutube/${lecture.id.videoId}`} className="lecture-link">
                <motion.img
                  src={lecture.snippet.thumbnails.medium.url}
                  alt={lecture.snippet.title}
                  className="lecture-thumbnail"
                  whileHover={{ scale: 1.1 }} // Zoom in on thumbnail hover
                  transition={{ duration: 0.3 }}
                />
                <motion.h3 className="lecture-title">{lecture.snippet.title}</motion.h3>
                <motion.p className="lecture-channel">{lecture.snippet.channelTitle}</motion.p>
              </Link>
            </motion.div>
          ))}
          {lectures.length === 0 && !isLoading && !error && (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>No lectures found. Please refine your search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
