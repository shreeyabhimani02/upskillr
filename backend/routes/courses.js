const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const filter = {
      status: "published"
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const courses = await Course.find(filter)
      .populate("tutorId", "fullName email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET courses by tutor (draft + published)
router.get("/tutor/:tutorId", async (req, res) => {
  try {
    const courses = await Course.find({
      tutorId: req.params.tutorId,
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
        // .populate("instructor");
        .populate("tutorId", "fullName email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Invalid course ID" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, category, price, tutorId, image, lessons } = req.body;

    console.log("REQ BODY:", req.body);
    console.log("LESSONS:", lessons);

    // 1️⃣ Create course
    const course = await Course.create({
      title,
      category,
      price,
      tutorId,
      image,
      status: "draft",
    });

    // 2️⃣ Create lessons (VERY IMPORTANT)
    if (lessons && lessons.length > 0) {
      const lessonDocs = lessons.map((l, index) => ({
        title: l.title,
        videoId: l.videoId,
        order: index + 1,
        courseId: course._id,
      }));

      await Lesson.insertMany(lessonDocs);
    }

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ UPDATE course (edit course)
router.put("/:id", async (req, res) => {
  try {
    const { title, category, price, image } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        price,
        image, // 🔥 IMPORTANT: thumbnail -> image
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    console.error("Course update error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUBLISH course
router.put("/:id/publish", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE course + its lessons
router.delete("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // delete all lessons of this course
    await Lesson.deleteMany({ courseId });

    // delete course
    await Course.findByIdAndDelete(courseId);

    res.json({ message: "Course and lessons deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

