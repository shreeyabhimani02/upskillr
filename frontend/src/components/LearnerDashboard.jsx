import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Award,
  ArrowRight,
  Star,
  MoreHorizontal,
  GraduationCap,
  Trophy,
  ExternalLink,
  ChevronRight,
  Home,
  FileText
} from "lucide-react";
import "./LearnerDashboard.css";
import { useAuth } from "../context/AuthContext";

const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [view, setView] = useState("dashboard");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);

  /* ===================== ONGOING COURSES ===================== */
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchEnrollments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/enrollment/my-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setOngoingCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Enrollment fetch failed", err);
        setOngoingCourses([]);
      }
    };

    fetchEnrollments();
  }, [token]);

  console.log("ONGOING COURSES:", ongoingCourses);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setAllCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setAllCourses([]);
      }
    };

    fetchAllCourses();
  }, []);

  const completedCourses = ongoingCourses.filter(
    (course) => course.progress === 100
  );

  const activeCourses = ongoingCourses.filter(
    (course) => course.progress < 100
  );

  const stats = {
  enrolled: ongoingCourses.length,
  completed: completedCourses.length,
  points: completedCourses.length * 10,
  };

  const enrolledCourseIds = ongoingCourses.map(course => course._id);

  const recommendedCourses = allCourses
    .filter(course => !enrolledCourseIds.includes(course._id))
    .slice(0, 3);

  /* ===================== CERTIFICATES ===================== */
  const certificates = completedCourses.map(course => ({
    id: course._id,
    title: course.title,
    issuer: "Upskillr",
  }));

  return (
    <div className="learner-dashboard">
      {/* SIDEBAR */}
      <aside className="learner-sidebar group">
        <div className="sidebar-content">
          <button onClick={() => navigate("/")} className="sidebar-btn inactive">
            <Home size={24} />
            <span className="sidebar-label">Home</span>
          </button>

          <button
            onClick={() => setView("certificates")}
            className={`sidebar-btn mt-2 ${
              view === "certificates" ? "active" : "inactive"
            }`}
          >
            <FileText size={24} />
            <span className="sidebar-label">My Certificates</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="learner-main">
        <div className="learner-container">
          {view === "dashboard" ? (
            <>
              {/* HEADER */}
              <header className="learner-header">
                <h1 className="learner-welcome">
                  Welcome back, {user?.fullName || "Learner"}
                </h1>
                <p className="learner-subtitle">
                  Continue your learning journey today.
                </p>
              </header>

              {/* STATS */}
              <div className="stats-container">
                <div className="stat-box">
                  <p className="stat-label-text">Courses Enrolled</p>
                  <p className="stat-number">{stats.enrolled}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label-text">Courses Completed</p>
                  <p className="stat-number">{stats.completed}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label-text">Upskillr Points</p>
                  <p className="stat-number">{stats.points}</p>
                </div>
              </div>

              {/* TABS */}
              <div className="tabs-wrapper">
                <div className="tabs-list">
                  <button
                    onClick={() => setActiveTab("ongoing")}
                    className={`tab-trigger ${activeTab === "ongoing" ? "active" : ""}`}
                  >
                    All Courses
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`tab-trigger ${activeTab === "completed" ? "active" : ""}`}
                  >
                    Completed
                  </button>
                </div>

                {/* COURSES */}
                <div className="course-grid">
                  {activeTab === "ongoing" &&
                    activeCourses.length > 0 &&
                    activeCourses.map((course) => (
                      <div key={course._id} className="learner-course-card">
                        <img src={course.image} alt={course.title} />

                        <h3>{course.title}</h3>
                        <p>{course.tutor}</p>

                        <div className="progress-bar-bg">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${course.progress || 0}%` }}
                          />
                        </div>

                        <button
                          onClick={() =>
                            navigate(
                              `/course/${course._id}/videos`
                            )
                          }
                        >
                          Resume
                        </button>
                      </div>
                    ))}
                    {activeTab === "completed" &&
                      completedCourses.length > 0 &&
                      completedCourses.map((course) => (
                        <div key={course._id} className="learner-course-card completed">
                          <img src={course.image} alt={course.title} />

                          <h3>{course.title}</h3>
                          <p>{course.tutor}</p>

                          <div className="completed-badge">
                            ✔ Course Completed
                          </div>

                          <button
                            onClick={() =>
                              navigate(`/course/${course._id}/videos`)
                            }
                          >
                            Review Course
                          </button>
                        </div>
                      ))}
                </div>
              </div>

              {/* RECOMMENDED */}
              <section className="recommendations-section">
                <h2>Recommended courses for you</h2>

                <div className="rec-grid">
                  {recommendedCourses.length > 0 ? (
                    recommendedCourses.map((course) => (
                      <div key={course._id} className="rec-card">
                        <img src={course.image} alt={course.title} />

                        <div className="rec-content">
                          <h3>{course.title}</h3>
                          <p>{course.instructor?.name}</p>

                          <button
                            className="explore-btn"
                            onClick={() => navigate(`/course/${course._id}`)}
                          >
                            Explore Course
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-rec-text">
                      🎉 You are enrolled in all available courses!
                    </p>
                  )}
                </div>
              </section>
            </>
          ) : (
            <>
              {/* CERTIFICATES */}
              <header className="certs-header">
                <button onClick={() => setView("dashboard")}>
                  <ArrowRight style={{ transform: "rotate(180deg)" }} />
                </button>
                <h1>My Certificates</h1>
              </header>

              <div className="certs-grid">
                {certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <div key={cert.id} className="cert-card">
                      <Award size={32} className="cert-icon" />

                      <h3>{cert.title}</h3>
                      <p>Issued by {cert.issuer}</p>

                      <button
                        className="cert-btn"
                        onClick={() => navigate(`/certificate/${cert.id}`)}
                      >
                        View Certificate <ExternalLink size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-cert-text">
                    🎓 Complete a course to unlock your certificates
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearnerDashboard;
