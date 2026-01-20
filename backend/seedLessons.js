const mongoose = require("mongoose");
const Lesson = require("./models/Lesson");
const Course = require("./models/Course");
require("dotenv").config();

const lessonsData = {
  "Complete React Developer Course 2025": [
    { title: "Introduction to React", videoId: "SqcY0GlETPk" },
    { title: "JSX & Components", videoId: "w7ejDZ8SWv8" },
    { title: "State & Props", videoId: "IYvD9oBCuJI" },
  ],
  "UI/UX Masterclass 2026": [
    { title: "Introduction to UI/UX", videoId: "55NvZjUZIO8" },
    { title: "Wireframing & Prototyping", videoId: "jWEE3YYv9BU" },
    { title: "Designing Interfaces", videoId: "uwNClNmekGU" },
    { title: "User Testing & Feedback", videoId: "Qt54SFOdBLE" },
  ],
  "Applied AI with Python": [
    { title: "Introduction to AI", videoId: "qYNweeDHiyU" },
    { title: "Python for AI", videoId: "ygXn5nV5qFc" },
    { title: "Machine Learning Basics", videoId: "Pj0neYUp9Tc" },
    { title: "Model Training & Evaluation", videoId: "LbX4X71-TFI" },
    { title: "AI Case Studies", videoId: "Ts42JTye-AI" },
  ],
  "Artificial Intelligence: Concepts & Applications": [
    { title: "Introduction to AI", videoId: "VGFpV3Qj4as" },
    { title: "Problem Solving & Search", videoId: "nxeoZkr0k6U" },
    { title: "Knowledge Representation", videoId: "V-O-RFSRe-E" },
    { title: "AI Applications & Ethics", videoId: "aGwYtUzMQUk" },
    { title: "AI Project Demo", videoId: "PulKlAZRoAY" },
    ],
    "MERN Stack Full Course": [
    { title: "Introduction to MERN Stack", videoId: "98BzS5Oz5E4" },
    { title: "React Fundamentals", videoId: "SqcY0GlETPk" },
    { title: "Express & Node.js", videoId: "Oe421EPjeBE" },
    { title: "MongoDB & Mongoose", videoId: "bALyYC10ABw" },
    { title: "Authentication & Security", videoId: "7BTsepZ9xp8" },
    { title: "Deployment & Best Practices", videoId: "oLE9iWAE1G4" },
    ],
    "Database Management Systems": [
    { title: "Relational Databases", videoId: "OqjJjpjDRLc" },
    { title: "SQL Queries", videoId: "FNYdBLwZ6cE" },
    { title: "Indexing & Optimization", videoId: "lYh6LrSIDvY" },
    { title: "NoSQL Databases", videoId: "0buKQHokLK8" },
    { title: "Transactions & ACID", videoId: "GAe5oB742dw" },
    { title: "Database Project", videoId: "zZpMvAedh_E" },
    ],
};

async function seedLessons() {
  await mongoose.connect(process.env.MONGO_URI);

  await Lesson.deleteMany();

  for (const courseTitle in lessonsData) {
    const course = await Course.findOne({ title: courseTitle });

    if (!course) {
      console.log(`❌ Course not found: ${courseTitle}`);
      continue;
    }

    const lessons = lessonsData[courseTitle].map((lesson, index) => ({
      ...lesson,
      courseId: course._id,
      order: index + 1,
    }));

    await Lesson.insertMany(lessons);
    console.log(`✅ Lessons added for ${courseTitle}`);
  }

  mongoose.disconnect();
}

seedLessons();
