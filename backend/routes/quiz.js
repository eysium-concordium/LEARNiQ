const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Quiz = require("../models/Quiz"); // Import Quiz model

// Route to handle user quiz submission and update points
router.post("/submit-quiz", fetchuser, async (req, res) => {
  try {
    const { userId, points } = req.body;

    let quiz = await Quiz.findOne({ user: userId });
    if (!quiz) {
      quiz = await Quiz.create({ user: userId });
    }
    quiz.points = quiz.points + points;
    await quiz.save();

    res.json({ message: "Quiz points updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
