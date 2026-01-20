const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Lesson = require("../models/Lesson");

router.get("/:courseId", async (req, res) => {
  try {
    const lessons = await Lesson.find({
      courseId: req.params.courseId,
    }).sort({ order: 1 });

    res.json(lessons);
  } catch (err) {
    console.error("Lesson fetch error:", err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE lessons for a course
router.put("/:courseId", async (req, res) => {
  try {
    const { lessons } = req.body;

    // 1️⃣ Remove old lessons
    await Lesson.deleteMany({ courseId: req.params.courseId });

    // 2️⃣ Insert updated lessons
    const newLessons = lessons.map((l, index) => ({
      title: l.title,
      videoId: l.videoId,
      order: index + 1,
      courseId: req.params.courseId,
    }));

    await Lesson.insertMany(newLessons);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET lesson count by tutor
router.get("/count/tutor/:tutorId", async (req, res) => {
  try {
    const courses = await require("../models/Course").find({
      tutorId: req.params.tutorId
    }).select("_id");

    const courseIds = courses.map(c => c._id);

    const count = await Lesson.countDocuments({
      courseId: { $in: courseIds }
    });
    
    res.json({ count });
  } catch (err) {
    console.error("Lesson count error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
