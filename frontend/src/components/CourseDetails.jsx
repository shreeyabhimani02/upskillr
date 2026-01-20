import React, { useEffect, useState } from "react";
import "./CourseDetails.css";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [enrollment, setEnrollment] = useState(null);
  const token = localStorage.getItem("token");

  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.progressPercent === 100;

  useEffect(() => {
  if (!token || !id) return;

  const fetchEnrollment = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/enrollment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setEnrollment(data);
    } catch (err) {
      console.error("Enrollment fetch failed", err);
    }
  };

  fetchEnrollment();
}, [id, token]);


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseRes = await fetch(`http://localhost:5000/api/courses/${id}`);
        const courseData = await courseRes.json();

        const lessonRes = await fetch(`http://localhost:5000/api/lessons/${id}`);
        const lessonData = await lessonRes.json();

        setCourse(courseData);
        setLessons(lessonData);
      } catch (err) {
        console.error("Failed to load course details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!course) return <h2 style={{ textAlign: "center" }}>Course not found</h2>;

  console.log("COURSE:", course);


  return (
    <div className="details-page">

      {/* HERO */}
      <section className="details-hero">
        <div className="details-hero-left">
          <div className="details-tags">
            <span className="details-badge">{course.category}</span>
            <span className="details-rating">
              ⭐ {course.rating} • {course.reviews} ratings
            </span>
          </div>

          <h1 className="details-title">{course.title}</h1>
          {/* <p className="details-subtitle">{course.previewText}</p> */}

          <div className="details-meta">
            <span>👥 50 students</span>
            <span>
              🕒 Updated{" "}
              {new Date(course.updatedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>🌐 English</span>
          </div>

          {course.tutorId && (
            <div className="details-author">
              {/* <img
                src="/default-avatar.png"
                alt={course.tutorId.fullName}
              /> */}
              <div>
                <small>CREATED BY </small>
                <strong>{course.tutorId.fullName}</strong>
                <p className="designation">Instructor</p>
                <p className="bio">{course.tutorId.email}</p>
              </div>
            </div>
          )}
          <br />

          {isCompleted && (
            <>
              <button
                className="enroll-btn completed"
                onClick={() => navigate(`/course/${id}/videos`)}
              >
                ✔ Review Course
              </button>

              <button
                className="enroll-btn certificate"
                onClick={() => navigate(`/certificate/${id}`)}
              >
                🎓 View Certificate
              </button>
            </>
          )}

          <br />

          <button className="back-btnn" onClick={() => navigate("/courses")}>
            ← Back to Courses
          </button>
        </div>

        {/* PRICE CARD */}
        <aside className="details-price-card">
          <div className="details-preview image-preview">
            <img src={course.image} alt={course.title} />
          </div>

          {!isEnrolled && (
            <>
              <div className="details-price">
                <h2>₹{course.price}</h2>
                {/* <span>₹{course.originalPrice}</span> */}
              </div>

              <button
                className="enroll-btn"
                onClick={async () => {
                  try {
                    await fetch("http://localhost:5000/api/enrollment", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ courseId: id }),
                    });

                    navigate(`/course/${id}/videos`);
                  } catch (err) {
                    console.error("Enrollment failed", err);
                  }
                }}
              >
                Enroll Now
              </button>
            </>
          )}

          {isEnrolled && !isCompleted && (
            <button
              className="enroll-btn continue"
              onClick={() => navigate(`/course/${id}/videos`)}
            >
              Continue Learning
            </button>
          )}

          {isCompleted && (
            <button className="enroll-btn completed" disabled>
              ✔ Course Completed
            </button>
          )}

          <p className="guarantee">30-Day Money-Back Guarantee</p>
          <ul className="details-includes">
            {course.includes?.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      {/* COURSE CONTENT */}
      <section className="details-section">
        <h2 className="section-title">Course Content</h2>

        <div className="content-box">
          <div className="content-header">
            <h4>{lessons.length} Lessons</h4>
          </div>

          {lessons.map((lesson, index) => (
            <div className="lesson" key={lesson._id || index}>
              <span>▶ {lesson.title}</span>
            </div>
          ))}
        </div>
      </section>


    {/* ================= INSTRUCTOR ================= */}
    {course.tutorId && (
      <section className="details-section">
        <h2 className="section-title">Instructor</h2>

        <div className="instructor-card">
          {/* <img src="/default-avatar.png" /> */}
          <div className="instructor-info">
            <h3>{course.tutorId.fullName}</h3>
            <p className="designation">Instructor</p>
            <p className="bio">{course.tutorId.email}</p>
          </div>
        </div>
      </section>
    )}
    </div>
  );

}

export default CourseDetails;
