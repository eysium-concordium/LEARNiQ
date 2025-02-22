import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Router } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Lectureyoutubecss.css";
import Navbar from "../components/Navbar/Navbar";
export default function Lectureyoutube() {
  const [completedVideos, setCompletedVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [getvideos, setGetVideos] = useState([]);
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistInfo, setPlaylistInfo] = useState({
    thumbnailUrl: "",
    description: "",
  });

  useEffect(() => {
    const storedCompletedVideos = localStorage.getItem("completedVideos");
    if (storedCompletedVideos) {
      setCompletedVideos(JSON.parse(storedCompletedVideos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedVideos", JSON.stringify(completedVideos));
  }, [completedVideos]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
    const backendURL = `${process.env.REACT_APP_BACKEND_URL}/api/lecture/get-video-completed`;
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
    const token = localStorage.getItem("token");

    axios
      .get(playlistUrl)
      .then((response) => {
        const playlistData = response.data.items[0].snippet;
        setPlaylistInfo({
          thumbnailUrl: playlistData.thumbnails.medium.url,
          description: playlistData.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching playlist information:", error);
      });

    axios
      .get(apiUrl)
      .then((response) => {
        setVideos(response.data.items);

        const videoIds = response.data.items.map(
          (video) => video.snippet.resourceId.videoId
        );
        setGetVideos(videoIds);
      })
      .catch((error) => {
        console.error("Error fetching playlist videos:", error);
      });

    axios
      .get(backendURL, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const videoIds = response.data.map((video) => video.videoId);
        setCompletedVideos(videoIds);
      })
      .catch((error) => {
        console.error("Error fetching videos from the backend:", error);
      });
  }, [playlistId]);

  const markVideoAsCompleted = (videoId) => {
    const token = localStorage.getItem("token");
    const isVideoCompleted = completedVideos.includes(videoId);

    if (isVideoCompleted) {
      const updatedCompletedVideos = completedVideos.filter(
        (completedVideoId) => completedVideoId !== videoId
      );
      setCompletedVideos(updatedCompletedVideos);
    } else {
      const updatedCompletedVideos = [...completedVideos, videoId];
      setCompletedVideos(updatedCompletedVideos);
    }

    const dataToSend = {
      videoId: videoId,
      playlistId: playlistId,
      completed: !isVideoCompleted,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/lecture/mark-video-completed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const constructVideoURL = (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <>
      <div className="container">
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <motion.div className="row" whileHover={{ scale: 1.1 }}>
                <img
                  src={playlistInfo.thumbnailUrl}
                  className="imy1"
                  alt="Thumbnail"
                />
              </motion.div>
              <br />
              <div className="row">
                <span className="lectextt">{playlistInfo.description}</span>
              </div>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-6">
              <br />
              {videos.map((video) => (
                <div className="row" key={video.id}>
                  <div className="col-sm-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault-${video.id}`}
                        onChange={() => markVideoAsCompleted(video.id)}
                        checked={
                          completedVideos.includes(video.id) ||
                          getvideos.includes(video.id)
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="col-sm-11">
                    <div className="row">
                      <a
                        href={constructVideoURL(
                          video.snippet.resourceId.videoId
                        )}
                        target="_blank"
                      >
                        <div className="col-sm-6">
                          <img src={video.snippet.thumbnails.medium.url}></img>
                        </div>
                        <div className="col-sm-6">
                          <span className="lectext">{video.snippet.title}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
