const express = require("express");
const Lesson = require("../models/Lesson");

const router = express.Router();

// Get lessons by course
router.get("/:courseId", async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId })
      .sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Failed to load lessons" });
  }
});

module.exports = router;
