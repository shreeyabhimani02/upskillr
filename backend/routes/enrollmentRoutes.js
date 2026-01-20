const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const authMiddleware = require("../middleware/authMiddleware");

/* ENROLL USER  ✅ (ADD THIS)*/
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    let enrollment = await Enrollment.findOne({ userId, courseId });

    if (!enrollment) {
      enrollment = await Enrollment.create({
        userId,
        courseId,
        completedLessons: 0,
        lastLessonIndex: 0,
        progressPercent: 0,
        completed: false,
      });
    }

    res.json(enrollment);
  } catch (err) {
    console.error("ENROLL ERROR:", err);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

/* SAVE / UPDATE PROGRESS */
router.post("/progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, completedLessons, lastLessonIndex, progressPercent } =
      req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      {
        completedLessons,
        lastLessonIndex,
        progressPercent,
        completed: progressPercent === 100,
      },
      { new: true, upsert: true }
    );

    res.json(enrollment);
  } catch (err) {
    console.error("SAVE PROGRESS ERROR:", err);
    res.status(500).json({ message: "Progress save failed" });
  }
});

/* GET MY COURSES  */
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.user.id,
    }).populate("courseId");

    const courses = enrollments
      .filter(e => e.courseId)
      .map(e => ({
        _id: e.courseId._id,
        title: e.courseId.title,
        image: e.courseId.image,
        tutor: e.courseId.instructor?.name || "Instructor",
        progress: e.progressPercent || 0,
        completedLessons: e.completedLessons || 0,
        lastLessonIndex: e.lastLessonIndex || 0,
      }));

    res.json(courses);
  } catch (err) {
    console.error("MY COURSES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* GET PROGRESS (KEEP LAST)*/
router.get("/:courseId", authMiddleware, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId: req.params.courseId,
    });

    res.json(enrollment);
  } catch (err) {
    console.error("GET PROGRESS ERROR:", err);
    res.status(500).json({ message: "Progress fetch failed" });
  }
});

module.exports = router;
