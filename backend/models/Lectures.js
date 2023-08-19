const mongoose = require("mongoose");
const { Schema } = mongoose;

const lectureSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  lecturUrl: {
    type: String,
  },
});

module.exports = mongoose.model("lecture", lectureSchema);
