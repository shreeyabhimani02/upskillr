console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Video, 
  IndianRupee, 
  Plus, 
  Edit3, 
  Upload, 
  BarChart2, 
  Star, 
  Layers, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { Link } from "react-router-dom";
import './TutorDashboard.css';
import logoImg from "../assets/upskillr-logo.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const TutorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editLessons, setEditLessons] = useState([]);

  const totalEarnings = courses.filter(c => c.status === "published").length * 3000;
  const totalStudents = courses.filter(c => c.status === "published").length * 50;
  
  const [courseForm, setCourseForm] = useState({
    title: '',
    price: '',
    category: '',
    image: ''
  });

  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    category: '',
    price: '',
    image: '',
    lessons: []   // 👈 STEP 1 ADDITION
  });

  const [lessonForm, setLessonForm] = useState({
    title: '',
    videoId: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const [lessonCount, setLessonCount] = useState(0);

  const [lessonCounts, setLessonCounts] = useState({});


  const totalVideos = courses.reduce(
    (sum, course) => sum + (course.lessons?.length || 0),
    0
  );

  useEffect(() => {
    if (!user?._id) return;

    fetch(`${API_BASE_URL}/api/lessons/count/tutor/${user._id}`)
      .then(res => res.json())
      .then(data => setLessonCount(data.count))
      .catch(err => console.error("Lesson count error", err));
  }, [user]);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`${API_BASE_URL}/api/courses/tutor/${user._id}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
      })
      .catch(err => console.error("Failed to load courses", err));
  }, [user]);

  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!courses.length) return;

    const fetchLessonCounts = async () => {
      const counts = {};

      await Promise.all(
        courses.map(async (course) => {
          const res = await fetch(`${API_BASE_URL}/api/lessons/${course._id}`);
          const lessons = await res.json();
          counts[course._id] = lessons.length;
        })
      );

      setLessonCounts(counts);
    };

    fetchLessonCounts();
  }, [courses]);

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: Layers, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Total Students', value: totalStudents.toLocaleString(), icon: Users, color: '#4f46e5', bg: '#eef2ff' },
    { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: IndianRupee, color: '#059669', bg: '#ecfdf5' },
    { label: 'Videos Uploaded', value: lessonCount , icon: Video, color: '#9333ea', bg: '#faf5ff' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="tutor-dashboard selection-blue">
      {/* Sidebar */}
      <aside className="premium-sidebar group">
        <div className="logo-container">
          <div className="logo-wrapper">
            <div className="logo-initial">
              <div className="u-icon">U</div>
            </div>
            <img src={logoImg} alt="Upskillr Logo" className="logo-full" />
            <span className="logo-text"></span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {[
            { id: 'dashboard', icon: BarChart2, label: 'Overview' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`nav-button ${activeView === item.id ? 'active' : 'inactive'}`}
            >
              <item.icon
                size={22}
                className={`shrink-0 nav-icon ${activeView === item.id ? "active-icon" : ""}`}
              />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <motion.div 
          className="content-container"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <header className="header">
            <motion.div variants={itemVariants}>
              <h1 className="header-title">
                Welcome back, {user?.fullName || "Tutor"}
              </h1>
              <p className="header-subtitle">
                Your courses reached <span style={{ color: '#2563eb', fontWeight: 700 }}>+12% more students</span> this week.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="header-actions">
              <button
                onClick={() => navigate("/")}
                className="btn-view-all"
              >
                ← Back
              </button>

              <button
                className="btn-primary"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus size={20} strokeWidth={3} />
                Create New Course
              </button>
            </motion.div>
          </header>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="stat-card"
              >
                <div 
                  className="stat-icon-wrapper" 
                  style={{ backgroundColor: stat.bg, color: stat.color }}
                >
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="dashboard-layout">
            <div className="courses-column">
              <div className="section-header">
                <h2 className="section-title">
                  My Active Courses
                  <span className="badge-live">Live</span>
                </h2>
              </div>

              <div className="course-list">
                <AnimatePresence>
                  {(showAllCourses ? courses : courses.slice(0, 3)).map((course) => (
                    <motion.div 
                      layout
                      key={course._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ x: 10 }}
                      className="course-card"
                    >
                      <div className="course-thumbnail-container">
                        <img src={course.image} alt={course.title} className="course-thumbnail" />
                        <div className="thumbnail-overlay"></div>
                        <label className="edit-thumbnail-label">
                          <Edit3 size={16} />
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (url) => {
                              setCourses(courses.map(c => c._id === course._id ? { ...c, image: url } : c));
                            })}
                          />
                        </label>
                      </div>

                      <div className="course-info">
                        <div>
                          <div className="course-title-row">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-category">
                              {course.category}
                            </p>
                          </div>
                          <div className="course-meta">
                            <span className="meta-item"><Video size={14} /> { lessonCounts[course._id] || 0} Lessons</span>
                          </div>
                        </div>

                        <div className="course-footer">
                          <div className="price-container">
                            <span className="course-price">₹{course.price}</span>
                          </div>
                          <div className="course-actions">
                            <button 
                              onClick={async () => {
                                setEditingCourse(course);
                                setCourseForm({
                                  title: course.title,
                                  category: course.category,
                                  price: course.price,
                                  image: course.image
                                });

                                // 👇 fetch lessons of this course
                                const res = await fetch(`${API_BASE_URL}/api/lessons/${course._id}`);
                                const lessonData = await res.json();
                                setEditLessons(lessonData);

                                setIsEditModalOpen(true);
                              }}
                              className="btn-edit btn-edit-primary"
                            >
                              Edit Course
                            </button>

                            {/* 👇 PUBLISH BUTTON */}
                            {course.status === "draft" && (
                              <button
                                className="btn-edit btn-edit-primary"
                                onClick={async () => {
                                  await fetch(
                                    `${API_BASE_URL}/api/courses/${course._id}/publish`,
                                    { method: "PUT" }
                                  );
                                  
                                }}
                              >
                                Publish
                              </button>
                            )}

                            <button
                              className="btn-edit btn-edit-primary"
                              onClick={async () => {
                                const confirmDelete = window.confirm(
                                  "Are you sure? This will delete the course and all its lessons."
                                );
                                if (!confirmDelete) return;

                                try {
                                  const res = await fetch(
                                    `${API_BASE_URL}/api/courses/${course._id}`,
                                    { method: "DELETE" }
                                  );

                                  const data = await res.json();

                                  if (!res.ok) {
                                    alert(data.message || "Failed to delete course");
                                    return;
                                  }

                                  // remove course from UI
                                  setCourses(prev => prev.filter(c => c._id !== course._id));

                                  alert("Course deleted successfully");
                                } catch (err) {
                                  console.error("Delete error:", err);
                                  alert("Server error while deleting course");
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Edit Course Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="modal-backdrop"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
            >
              <h2 className="modal-title">Edit Course</h2>
              <p className="modal-description">Update your course details and pricing.</p>
              
              <div className="form-container">
                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input 
                    type="text" 
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development, AI, Cloud Computing"
                    value={courseForm.category}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, category: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input 
                    type="number" 
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Thumbnail</label>
                  <div className="thumbnail-upload-wrapper">
                    <div className="thumbnail-preview">
                      <img src={courseForm.image} alt="Preview" />
                    </div>
                    <label className="upload-label">
                      <Upload size={18} style={{ color: '#2563eb' }} />
                      <span className="upload-text">Upload via File Explorer</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCourseForm({ ...courseForm, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }}

                      />
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Edit Lessons</label>

                  {editLessons.map((lesson, index) => (
                    <div key={lesson._id || index} className="lesson-edit-card">
                      
                      <div className="lesson-input-group">
                        <label className="lesson-label">Lesson Title</label>
                        <input
                          type="text"
                          placeholder="Enter lesson title"
                          value={lesson.title}
                          className="form-input"
                          onChange={(e) => {
                            const updated = [...editLessons];
                            updated[index].title = e.target.value;
                            setEditLessons(updated);
                          }}
                        />
                      </div>

                      <div className="lesson-input-group">
                        <label className="lesson-label">YouTube Video ID</label>
                        <input
                          type="text"
                          placeholder="e.g. dQw4w9WgXcQ"
                          value={lesson.videoId}
                          className="form-input"
                          onChange={(e) => {
                            const updated = [...editLessons];
                            updated[index].videoId = e.target.value;
                            setEditLessons(updated);
                          }}
                        />
                      </div>

                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() =>
                      setEditLessons([
                        ...editLessons,
                        { title: "", videoId: "" }
                      ])
                    }
                  >
                    + Add Lesson
                  </button>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={async () => {
                      try{
                        const res = await fetch(`${API_BASE_URL}/api/courses/${editingCourse._id}`, 
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          title: courseForm.title,
                          category: courseForm.category,
                          price: Number(courseForm.price),
                          image: courseForm.image
                        }),
                      }
                    );

                    const updatedCourse = await res.json();

                    if (!res.ok) {
                      alert(updatedCourse.message || "Failed to update course");
                      return;
                    }

                      // 👇 update lessons
                      await fetch(`${API_BASE_URL}/api/lessons/${editingCourse._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          lessons: editLessons.map(l => ({
                            title: l.title,
                            videoId: l.videoId
                          }))
                        })

                      });

                    
                    setCourses(prev =>
                        prev.map(c =>
                          c._id === updatedCourse._id ? updatedCourse : c
                        )
                      );

                      setIsEditModalOpen(false);
                      setEditingCourse(null);
                    } catch (err) {
                      console.error("Save failed:", err);
                      alert("Server error while saving");
                    }
                  }}
                    className="btn-submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Course Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="modal-backdrop"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
            >
              <h2 className="modal-title">Create New Course</h2>
              <p className="modal-description">Draft your next masterpiece and reach thousands.</p>
              
              <div className="form-container">
                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input 
                    type="text" 
                    value={newCourseForm.title}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    placeholder="e.g. Advanced Quantum Computing"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development, AI, Cloud"
                    value={newCourseForm.category}
                    onChange={(e) =>
                      setNewCourseForm({ ...newCourseForm, category: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input 
                    type="number" 
                    value={newCourseForm.price}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, price: e.target.value })}
                    placeholder="e.g. 4999"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Thumbnail</label>
                  <div className="thumbnail-upload-wrapper">
                    {newCourseForm.image && (
                      <div className="thumbnail-preview">
                        <img src={newCourseForm.image} alt="Preview" />
                      </div>
                    )}
                    <label className="upload-label">
                      <Upload size={18} style={{ color: '#2563eb' }} />
                      <span className="upload-text">Upload via File Explorer</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setNewCourseForm({ ...newCourseForm, image: url }))}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Add Lessons</label>

                  <input
                    type="text"
                    placeholder="Lesson Title"
                    value={lessonForm.title}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, title: e.target.value })
                    }
                    className="form-input"
                  />

                  <input
                    type="text"
                    placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
                    value={lessonForm.videoId}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, videoId: e.target.value })
                    }
                    className="form-input"
                  />

                  <button
                    className="btn-secondary"
                    disabled={!lessonForm.title || !lessonForm.videoId}
                    onClick={() => {
                      if (!lessonForm.title || !lessonForm.videoId) return;

                      setNewCourseForm({
                        ...newCourseForm,
                        lessons: [...newCourseForm.lessons, lessonForm],
                      });

                      setLessonForm({ title: "", videoId: "" });
                    }}
                  >
                     Add Lesson
                  </button>
                </div>

                {/* STEP 3: Lessons Preview */}
                {newCourseForm.lessons.length > 0 && (
                  <div className="lesson-preview">
                    <h4 className="lesson-preview-title">Lessons Added</h4>

                    {newCourseForm.lessons.map((lesson, index) => (
                      <div key={index} className="lesson-preview-item">
                        <span>
                          {index + 1}. {lesson.title}
                        </span>

                        <span className="lesson-video-id">
                          (YouTube ID: {lesson.videoId})
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="modal-footer">
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-submit"
                    onClick={async () => {
                      if (!newCourseForm.title || newCourseForm.lessons.length === 0) {
                        alert("Course must have title and at least one lesson");
                        return;
                      }

                      if (!user || !user._id) {
                        alert("Please login again");
                        return;
                      }

                      const payload = {
                        title: newCourseForm.title,
                        category: newCourseForm.category,
                        price: Number(newCourseForm.price),
                        image: newCourseForm.image,
                        lessons: newCourseForm.lessons.map(l => ({
                          title: l.title,
                          videoId: l.videoId
                        })),
                        status: "draft",
                        tutorId: user._id,
                      };

                      console.log("SENDING PAYLOAD:", payload);

                      try {
                        const res = await fetch(`${API_BASE_URL}/api/courses`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });

                        const data = await res.json();

                        if (!res.ok) {
                          console.error("Server error:", data);
                          alert(data.message || "Failed to create course");
                          return;
                        }

                        setCourses([data, ...courses]);

                        setNewCourseForm({
                          title: "",
                          price: "",
                          image: "",
                          lessons: [],
                        });

                        setIsCreateModalOpen(false);
                      } catch (err) {
                        console.error("Network error:", err);
                        alert("Server not reachable");
                      }
                    }}
                  >
                    Create Course
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TutorDashboard;