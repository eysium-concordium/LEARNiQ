const express = require("express");
const router = express.Router();
const cors = require("cors");
const fetchuser = require("../middleware/fetchuser");
const Lecture = require("../models/Lectures");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

router.post("/getuserdetails", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const userName = user.name;
    // console.log(userName);

    const quiz = await Quiz.findOne({ user: userId });
    const quizPoints = quiz ? quiz.points : 0;

    const lectures = await Lecture.find({ user: userId });
    const lectureTitles = lectures
      ? ""
      : lectures.map((lecture) => lecture.title);

    res.json({
      userName,
      quizPoints,
      lectureTitles,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
