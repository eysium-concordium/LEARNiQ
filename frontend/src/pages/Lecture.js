import React, { useEffect, useState } from "react";
import "./Lecturecss.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Lecture() {
  const [Playlist, setPlaylist] = useState([]);
  const [search, setSearch] = useState("");
  const [userId, setUserID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/getuser", {
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
          //console.log(data._id);
          setUserID(data._id);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error.message);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const fetchPlaylists = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setPlaylist([]);
      return;
    }
    const API_KEY = "AIzaSyDQVefVfE8A6B0nZ7PI58kN2vFk4Z42ziw";
    const maxResults = 10;

    try {
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            key: API_KEY,
            q: searchQuery,
            part: "snippet",
            type: "playlist",
            maxResults: maxResults,
          },
        })
        .then((response) => {
          console.log(response.data.items);
          setPlaylist(response.data.items);
        })
        .catch((error) => {
          console.error("Error fetching playlists:", error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const sendPlaylistDataToBackend = (playlistId, title) => {
    console.log("Sending data to backend");
    const token = localStorage.getItem("token");
    const dataToSend = {
      userID: userId,
      playlistId: playlistId,
      title: title,
    };

    fetch("http://localhost:5000/api/lecture/playlist-add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  useEffect(() => {
    fetchPlaylists(search);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPlaylists(search);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <div className="searchBar">
                  <input
                    id="searchQueryInput"
                    type="text"
                    name="searchQueryInput"
                    placeholder="Search"
                    style={{ color: "whitesmoke" }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <motion.button
                    id="searchQuerySubmit"
                    type="submit"
                    name="searchQuerySubmit"
                    whileHover={{ scale: 1.5 }}
                  >
                    <svg
                      style={{ width: "24px", height: "24px" }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="whitesmoke"
                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                      />
                    </svg>
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            {Playlist.map((playlist) => (
              <div className="col-sm-4" key={playlist.id.playlistId}>
                <motion.div className="row" whileHover={{ scale: 1.1 }}>
                  <Link
                    to={`/Lectureyoutube/${playlist.id.playlistId}`}
                    onClick={() =>
                      sendPlaylistDataToBackend(
                        playlist.id.playlistId,
                        playlist.snippet.title
                      )
                    }
                  >
                    <img
                      src={playlist.snippet.thumbnails.medium.url}
                      style={{
                        width: "350px",
                        height: "225px",
                        padding: "5px",
                        borderRadius: "15px",
                      }}
                      alt="Playlist Thumbnail"
                    />
                  </Link>
                </motion.div>
                <div className="row">
                  <Link to={`/Lectureyoutube/${playlist.id.playlistId}`}>
                    <p
                      style={{
                        color: "whitesmoke",
                        fontWeight: "bolder",
                      }}
                      className="pi"
                    >
                      {playlist.snippet.title}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
