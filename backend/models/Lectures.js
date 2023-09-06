const mongoose = require("mongoose");
const { Schema } = mongoose;

const lectureSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  playListID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
