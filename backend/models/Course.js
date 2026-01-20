const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoId: { type: String, required: true },
  duration: String
});


const instructorSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  designation: String,
  bio: String,
  rating: Number,
  students: String,
  courses: Number,
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    category: {
      type: String,
      required: true,
    },

    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
    image: String,
    rating: Number,
    reviews: Number,
    students: String,
    lastUpdated: String,
    language: String,

    instructor: instructorSchema,

    price: Number,
    originalPrice: Number,
    previewText: String,

    includes: [String],
    learningOutcomes: [String],

    contentHeader: String,
    totalDuration: String,
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
