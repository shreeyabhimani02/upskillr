import React, { useState, useEffect } from "react";
import "./CourseVideos.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function CourseVideos() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  console.log("courseId param:", courseId);

  /* ===================== STATE ===================== */
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState(0);

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const token = localStorage.getItem("token");
  
  const [searchParams] = useSearchParams();
  const resumeLesson = Number(searchParams.get("lesson")) || 0;

  useEffect(() => {
    fetch(`http://localhost:5000/api/lessons/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched lessons:", data);
        setLessons(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Lesson fetch error:", err));
  }, [courseId]);

  /* ===================== FETCH SAVED PROGRESS ===================== */
  useEffect(() => {
  if (!token || !courseId) return;

  const fetchProgress = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/enrollment/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data) {
        setCompleted(data.completedLessons || 0);

        if (searchParams.has("lesson")) {
          setCurrentLesson(resumeLesson);
        } else {
          setCurrentLesson(data.lastLessonIndex || 0);
        }
      }
    } catch (err) {
      console.error("Progress fetch error:", err);
    }
  };

  fetchProgress();
}, [courseId, token]);


  /* ===================== FEEDBACK RESTORE (local) ===================== */
  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem(`course_${courseId}_feedback`)
    );
    if (savedData) {
      setFeedback(savedData.feedback);
      setRating(savedData.rating);
      setIsSubmitted(true);
    }
  }, [courseId]);

  /* ===================== PROGRESS PERCENT ===================== */
  const progressPercent = lessons.length
    ? Math.round((completed / lessons.length) * 100)
    : 0;

  /* ===================== SAVE PROGRESS ===================== */
  const unlockNext = async () => {
  let nextLesson = currentLesson;

  if (currentLesson < lessons.length - 1) {
    nextLesson = currentLesson + 1;
  }

  setCompleted(currentLesson + 1);
  setCurrentLesson(nextLesson);

  const progressPercent = Math.round(
    ((currentLesson + 1) / lessons.length) * 100
  );

  await fetch("http://localhost:5000/api/enrollment/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      courseId,
      completedLessons: currentLesson + 1,
      lastLessonIndex: currentLesson,
      progressPercent,
    }),
  });
};


  /* ===================== FEEDBACK SAVE ===================== */
  const saveFeedback = () => {
    if (!feedback || rating === 0) return;

    localStorage.setItem(
      `course_${courseId}_feedback`,
      JSON.stringify({ feedback, rating })
    );
    setIsSubmitted(true);
  };

  /* ===================== GUARDS ===================== */
  if (!lessons.length) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No lessons available
      </h2>
    );
  }

  /* ===================== UI ===================== */
  return (
    <div>
      {/* HEADER */}
      <div className="course-video-header">
        <button
          className="back-top-btn"
          onClick={() => navigate(`/course/${courseId}`)}
        >
          ← Back to Course
        </button>

        <h2 className="lesson-title">
          Lesson Title: {lessons[currentLesson]?.title}
        </h2>
      </div>

      <div className="video-page">
        {/* VIDEO PLAYER */}
        <div className="video-main">
          <div className="video-player">
            <iframe
              src={`https://www.youtube.com/embed/${lessons[currentLesson]?.videoId}`}
              title={lessons[currentLesson]?.title}
              allowFullScreen
            />
          </div>

          <button
            className="complete-btn"
            onClick={unlockNext}
            disabled={currentLesson < completed - 1} // allow revisiting previous lessons
          >
            {currentLesson < completed - 1
              ? "Completed ✔"
              : "Mark as Completed"}
          </button>

          {/* PROGRESS */}
          <div className="video-progress">
            <div className="progress-info">
              <span>
                Lesson {currentLesson + 1} of {lessons.length}
              </span>
              <span>{progressPercent}% Completed</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* LESSON LIST */}
        <div className="lesson-list">
          <h3>Course Content</h3>

          {lessons.map((lesson, index) => {
            const locked = index >= completed;

            return (
              <div key={lesson._id}
                className={`lesson-item ${locked ? "locked" : ""} ${
                  index === currentLesson ? "active" : ""
                }`}
                onClick={() => !locked && setCurrentLesson(index)}
              >
                <span>{lesson.title}</span>
                <span>{locked ? "🔒" : index < completed ? "✔" : "▶"}</span>
              </div>
            );
          })}

          {/* FEEDBACK */}
          <div className="feedback-box">
            <h4>Comments & Reviews</h4>

            {!isSubmitted ? (
              <>
                <textarea
                  placeholder="Write your reviews..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />

                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= rating ? "star active" : "star"}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <button onClick={saveFeedback} className="submit-feedback">
                  Submit Feedback
                </button>
              </>
            ) : (
              <>
                <p className="feedback-text">“{feedback}”</p>
                <div className="rating readonly">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= rating ? "star active" : "star"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="submitted-badge">✔ Feedback Submitted</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseVideos;
