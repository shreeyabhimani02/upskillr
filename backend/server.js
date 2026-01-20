const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ROUTES
const authRoutes = require("./routes/auth");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const courseRoutes = require("./routes/courses");
const lessonRoutes = require("./routes/lessons");

const app = express();
const PORT = 5000;


// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===== ROUTES =====
app.use("/api/auth", authRoutes);           // Login / Signup / Google
app.use("/api/courses", courseRoutes);   
app.use("/api/lessons", lessonRoutes);   // Courses + Lessons
app.use("/api/enrollment", enrollmentRoutes);  
 // Enrollment + Progress

// ===== DATABASE =====
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://Moksha:Moksha@cluster0.m93uyl7.mongodb.net/lms_db"
  )
  .then(() => {
    console.log("MongoDB connected to DB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
