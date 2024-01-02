const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Quiz = require("../models/Quiz");

router.post("/submit-quiz", fetchuser, async (req, res) => {
  try {
    // console.log("Yeh lo " + req.body);
    const { userId, points } = req.body;
    // console.log(points + " " + userId);
    let quiz = await Quiz.findOne({ user: userId });
    if (!quiz) {
      quiz = await Quiz.create({ user: userId });
    }
    quiz.user = userId;
    quiz.points = quiz.points + points;
    await quiz.save();

    res.json({ message: "Quiz points updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
