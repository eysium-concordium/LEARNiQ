const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("quiz", QuizSchema);
