const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Lecture = require("../models/Lectures");
const CompletedVideo = require("../models/CompletedVideo");

router.post("/playlist-add", fetchuser, async (req, res) => {
  try {
    const { userID, playlistId, title } = req.body;

    let present = await Lecture.findOne({
      user: userID,
      playListID: playlistId,
    });

    if (!present) {
      present = new Lecture({
        user: userID,
        playListID: playlistId,
        title: title,
      });
    } else {
      present.user = userID;
      present.playListID = playlistId;
      present.title = title;
    }

    await present.save();

    res.json({ message: "Lecture information saved successfully" });
  } catch (error) {
    // console.log(error.message);
    res.status(500).send("Internal server error!");
  }
});

router.post("/mark-video-completed", fetchuser, async (req, res) => {
  try {
    const { videoId, playlistId } = req.body;
    const userId = req.user.id;
    let completedVideo = await CompletedVideo.findOne({
      userId: userId,
      videoId: videoId,
      playlistId: playlistId,
    });

    if (!completedVideo) {
      console.log("MARKED TRUE new");
      completedVideo = new CompletedVideo({
        userId: userId,
        videoId: videoId,
        playlistId: playlistId,
        completed: true,
      });
    } else if (completedVideo && completedVideo.completed === true) {
      // console.log("MARKED FALSE");
      completedVideo.completed = false;
    } else if (completedVideo && completedVideo.completed === false) {
      // console.log("MARKED true");
      completedVideo.completed = true;
    }

    await completedVideo.save();

    res.json({ message: "Video marked as completed" });
  } catch (error) {
    console.error("Error marking video as completed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-video-completed", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const completedVideos = await CompletedVideo.find({
      userId,
      completed: true,
    });

    res.json(completedVideos);
  } catch (error) {
    console.error("Error fetching completed videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
