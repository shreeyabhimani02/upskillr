const express = require("express");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

// Check enrollment
router.get("/:courseId/:userId", async (req, res) => {
  const enrollment = await Enrollment.findOne({
    courseId: req.params.courseId,
    userId: req.params.userId,
  });

  res.json(enrollment);
});

// Update progress
router.put("/progress", async (req, res) => {
  const { courseId, userId, completedLessons, completed } = req.body;

  const enrollment = await Enrollment.findOneAndUpdate(
    { courseId, userId },
    { completedLessons, completed },
    { new: true }
  );

  res.json(enrollment);
});

module.exports = router;
