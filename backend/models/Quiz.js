const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  points: {
    type: Number,
  },
});

module.exports = mongoose.model("quiz", QuizSchema);
