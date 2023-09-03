const mongoose = require("mongoose");

const completedVideoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  playlistId: {
    type: String,
    ref: "Lectures",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const CompletedVideo = mongoose.model("CompletedVideo", completedVideoSchema);

module.exports = CompletedVideo;
