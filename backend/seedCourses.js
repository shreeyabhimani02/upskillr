const mongoose = require("mongoose");
const Course = require("./models/Course");

mongoose.connect(
  "mongodb+srv://Moksha:Moksha@cluster0.m93uyl7.mongodb.net/lms_db"
);

const coursesData = [
  {
    title: "Complete React Developer Course 2025",
    category: "Development",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    rating: 4.8,
    reviews: 120,
    students: "1,250",
    lastUpdated: "June 2025",
    language: "English",
    instructor: {
      name: "Sarah Smith",
      avatar: "https://i.pravatar.cc/100?img=1",
      designation: "Senior Software Engineer & Instructor",
      bio: "Sarah has 10+ years of experience building scalable web apps and teaching developers worldwide.",
      rating: 4.8,
      students: "50k+",
      courses: 12,
    },
    price: 49.99,
    originalPrice: 74.99,
    previewText: "Preview this course",
    includes: [
      "📹 3 on-demand video lessons",
      "♾ Lifetime access",
      "📜 Certificate of completion",
      "📱 Mobile & TV access",
    ],
    learningOutcomes: [
      "Build full-stack applications",
      "Secure authentication systems",
      "Write clean & scalable code",
      "Deploy apps to production",
      "Modern dev tools & workflows",
      "Collaborate in teams",
    ],
    contentHeader: "Introduction & Basics",
    totalDuration: "45 mins",
    lessons: [
      { title: "Introduction to React", duration: "10:00" },
      { title: "JSX & Components", duration: "15:30" },
      { title: "State & Props", duration: "20:00" },
    ],
  },

  // 👉 Repeat for other courses (2–6) EXACTLY SAME AS YOUR DATA
  {
    title: "UI/UX Masterclass 2026",
    category: "Design",
    image: "https://media.istockphoto.com/id/2210688897/photo/ux-ui-design-web-and-application-user-design-concepts-web-design-application-design-user.webp?a=1&b=1&s=612x612&w=0&k=20&c=3vTDBUL24n5mH1Hpu3kf9uVqjItR6a2lboOWV_VFQlE=",
    rating: 4.9,
    reviews: 95,
    students: "850",
    lastUpdated: "January 2026",
    language: "English",
    instructor: {
        name: "Emily Johnson",
        designation: "Lead UX Designer & Instructor",
        avatar: "https://i.pravatar.cc/100?img=32",
        bio: "Emily has 8+ years designing intuitive user experiences and has trained hundreds of designers worldwide.",
        rating: 4.9,
        students: "8k+",
        courses: 5
    },
    price: 59.99,
    originalPrice: 99.99,
    previewText: "Preview this course",
    includes: [
        "📹 4 on-demand video lessons",
        "♾ Lifetime access",
        "📜 Certificate of completion",
        "📱 Mobile & TV access"
    ],
    learningOutcomes: [
        "Master UI/UX design principles",
        "Create wireframes & prototypes",
        "Design responsive user interfaces",
        "Conduct user testing and research",
        "Collaborate with developers effectively",
        "Build a professional design portfolio"
    ],
    contentHeader: "Foundations & Tools",
    totalDuration: "60 mins",
    lessons: [
        { title: "Introduction to UI/UX", duration: "12:00" },
        { title: "Wireframing & Prototyping", duration: "18:00" },
        { title: "Designing Interfaces", duration: "15:00" },
        { title: "User Testing & Feedback", duration: "15:00" }
    ]
    },
    {
    title: "Applied AI with Python",
    category: "Artificial Intelligence",
    image: "https://media.istockphoto.com/id/2223838478/photo/learn-python-programming-language-computer-courses-training.webp?a=1&b=1&s=612x612&w=0&k=20&c=7njnaOMw5EFUUW7qPPZcGLl73WSTTnOd0R5RcTnSTVw=",
    rating: 4.7,
    reviews: 140,
    students: "1,600",
    lastUpdated: "March 2026",
    language: "English",
    instructor: {
      name: "Dr. Rahul Verma",
      avatar: "https://i.pravatar.cc/100?img=12",
      designation: "AI Researcher & Data Scientist",
      bio: "Rahul specializes in applied machine learning and has worked on real-world AI systems across healthcare and finance.",
      rating: 4.7,
      students: "30k+",
      courses: 9
    },
    price: 69.99,
    originalPrice: 109.99,
    previewText: "Preview this course",
    includes: [
      "📹 5 on-demand video lessons",
      "♾ Lifetime access",
      "📜 Certificate of completion",
      "📱 Mobile & TV access"
    ],
    learningOutcomes: [
      "Build AI models using Python",
      "Work with NumPy, Pandas & Scikit-learn",
      "Understand supervised & unsupervised learning",
      "Apply AI to real-world datasets",
      "Evaluate and improve ML models",
      "Deploy basic AI applications"
    ],
    contentHeader: "AI Foundations with Python",
    totalDuration: "75 mins",
    lessons: [
      { title: "Introduction to Artificial Intelligence", duration: "10:00" },
      { title: "Python for AI", duration: "15:00" },
      { title: "Machine Learning Basics", duration: "20:00" },
      { title: "Model Training & Evaluation", duration: "15:00" },
      { title: "AI Case Studies", duration: "15:00" }
    ]
  },

  {
    title: "Artificial Intelligence: Concepts & Applications",
    category: "Artificial Intelligence",
    image: "https://media.istockphoto.com/id/1933417108/photo/ai-chatbot-artificial-intelligence-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=faD707ehv7Nc1HBXtMZYbNNHZTYhHEnULlbrgkRNGNE=",
    rating: 4.6,
    reviews: 110,
    students: "1,200",
    lastUpdated: "February 2026",
    language: "English",
    instructor: {
      name: "Prof. Ananya Mehta",
      avatar: "https://i.pravatar.cc/100?img=45",
      designation: "Professor of Computer Science",
      bio: "Ananya teaches AI theory and applications with a strong focus on problem-solving and ethics.",
      rating: 4.6,
      students: "20k+",
      courses: 7
    },
    price: 54.99,
    originalPrice: 89.99,
    previewText: "Preview this course",
    includes: [
      "📹 4 on-demand video lessons",
      "♾ Lifetime access",
      "📜 Certificate of completion",
      "📱 Mobile & TV access"
    ],
    learningOutcomes: [
      "Understand core AI concepts",
      "Explore search & reasoning techniques",
      "Learn knowledge representation",
      "Understand expert systems",
      "Analyze AI use cases",
      "Understand ethical implications of AI"
    ],
    contentHeader: "Core AI Concepts",
    totalDuration: "65 mins",
    lessons: [
      { title: "Introduction to AI", duration: "15:00" },
      { title: "Problem Solving & Search", duration: "15:00" },
      { title: "Knowledge Representation", duration: "20:00" },
      { title: "AI Applications & Ethics", duration: "15:00" },
      { title : "AI Project Demo", duration : "50:00"}
    ]
  },

  {
    title: "MERN Stack Full Course",
    category: "Development",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",   
    rating: 4.9,
    reviews: 220,
    students: "2,400",
    lastUpdated: "April 2026",
    language: "English",
    instructor: {
      name: "Alex Carter",
      avatar: "https://i.pravatar.cc/100?img=18",
      designation: "Full Stack Developer & Mentor",
      bio: "Alex has built production-grade MERN applications and mentors aspiring full-stack developers.",
      rating: 4.9,
      students: "60k+",
      courses: 10
    },
    price: 79.99,
    originalPrice: 129.99,
    previewText: "Preview this course",
    includes: [
      "📹 6 on-demand video lessons",
      "♾ Lifetime access",
      "📜 Certificate of completion",
      "📱 Mobile & TV access"
    ],
    learningOutcomes: [
      "Build full MERN stack applications",
      "Create REST APIs with Node & Express",
      "Design MongoDB schemas",
      "Develop frontend with React",
      "Implement authentication",
      "Deploy full-stack projects"
    ],
    contentHeader: "Full Stack Development",
    totalDuration: "90 mins",
    lessons: [
      { title: "Introduction to MERN Stack", duration: "15:00" },
      { title: "MongoDB & Mongoose", duration: "15:00" },
      { title: "Express & Node.js", duration: "15:00" },
      { title: "React Fundamentals", duration: "20:00" },
      { title: "Authentication & Security", duration: "15:00" },
      { title: "Deployment & Best Practices", duration: "10:00" }
    ]
  },

  {
    title: "Database Management Systems",
    category: "Database",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    rating: 4.5,
    reviews: 130,
    students: "1,100",
    lastUpdated: "December 2025",
    language: "English",
    instructor: {
      name: "Vikram Patel",
      avatar: "https://i.pravatar.cc/100?img=27",
      designation: "Database Architect & Trainer",
      bio: "Vikram has designed enterprise databases and teaches database concepts with practical examples.",
      rating: 4.5,
      students: "25k+",
      courses: 6
    },
    price: 44.99,
    originalPrice: 69.99,
    previewText: "Preview this course",
    includes: [
      "📹 4 on-demand video lessons",
      "♾ Lifetime access",
      "📜 Certificate of completion",
      "📱 Mobile & TV access"
    ],
    learningOutcomes: [
      "Understand DBMS fundamentals",
      "Learn relational database design",
      "Write SQL queries",
      "Understand normalization",
      "Work with transactions",
      "Apply indexing & optimization"
    ],
    contentHeader: "Database Fundamentals",
    totalDuration: "70 mins",
    lessons: [
      { title: "Relational Databases", duration: "15:00" },
      { title: "SQL Queries", duration: "20:00" },
      { title: "Indexing & Optimization", duration: "20:00" },
      { title: "NoSQL Databases", duration: "15:00" },
      { title: "Transactions & ACID", duration: "15:00" },
      { title: "Database Project", duration: "15:00" }
    ]
    }
];

async function seed() {
  try {
    await Course.deleteMany(); // optional: clears old data
    await Course.insertMany(coursesData);
    console.log("✅ Courses inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
