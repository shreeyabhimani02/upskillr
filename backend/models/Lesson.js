const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  order: Number,
});

module.exports = mongoose.model("Lesson", lessonSchema);

