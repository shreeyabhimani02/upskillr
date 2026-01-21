import React, { useEffect, useState } from "react";
import "./CoursesCarousel.css";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const bgColors = [
  "#E0F2FE",
  "#DCFCE7",
  "#FAE8FF",
  "#FEF9C3",
  "#FCE7F3",
  "#FFEDD5"
];

const CourseCarousel = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/courses?status=published`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.slice(0, 6));
      })
      .catch(err => console.error("Carousel fetch error:", err));
  }, []);

  return (
    <div className="carousel-container">
      <h2 className="carousel-heading">Popular Courses</h2>

      <div className="carousel-track">
        {courses.map((course) => (
          <div key={course._id} className="course-card-new">

            <div className="course-image-wrapper">
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
              <span className="course-category-pill">
                {course.category}
              </span>
            </div>

            <div className="course-body">
              <h3 className="carousel-title">{course.title}</h3>

              <div className="course-footer">
                <div className="course-tutor">
                  <User size={14} />
                  <span>
                    {course.tutorId?.fullName || course.instructor?.name}
                  </span>
                </div>

                <span className="carousel-price">
                  ₹{course.price}
                </span>
              </div>

              <button
                className="view-details-btn"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CourseCarousel;
