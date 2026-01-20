import React, { useState, useEffect } from "react";
import "./ExploreCourses.css";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Loader2 } from "lucide-react";
import { Star, User, Tag } from 'lucide-react';

function ExploreCourses() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const [priceRange, setPriceRange] = useState(99);

  const maxCoursePrice =
    courses.length > 0 ? Math.max(...courses.map(c => c.price)) : 99;

  useEffect(() => {
    const fetchCourses = () => {
      fetch("http://localhost:5000/api/courses?status=published")
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => console.error(err));
    };

    fetchCourses();

    window.addEventListener("focus", fetchCourses);
    return () => window.removeEventListener("focus", fetchCourses);
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setPriceRange(maxCoursePrice);
    }
  }, [courses]);
  // Debounce/Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay for smoother transition
    return () => clearTimeout(timer);
  }, [search, selectedCategory, priceRange]);

  const filteredCourses = courses.filter((course) => {
    const courseCategory = course.category?.trim().toLowerCase();
    const selectedCat = selectedCategory.toLowerCase();

    const matchesSearch =
      course.title?.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || courseCategory === selectedCat;

    const matchesPrice = Number(course.price) <= priceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = [
    "All",
    ...Array.from(
      new Set(
        courses
          .map(course => course.category?.trim().toUpperCase())
          .filter(Boolean)
      )
    )
  ].map(cat =>
    cat === "All"
      ? "All"
      : cat.charAt(0).toUpperCase() + cat.slice(1)
  );
  

  return (
    <div className="page">
      <div className="Banner">
        <h1>Explore Our Catalog</h1>
        <p>
          Discover over <b>2,000+</b> courses from expert instructors. Master new
          skills and advance your career.
        </p>

        <input
          type="text"
          className="search-bar"
          placeholder="Search for courses or instructors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="explore-container">
        {/* SIDEBAR FILTERS */}
        <aside className="filters-sidebar">
          <h2 className="sidebar-heading">Filter by</h2>
          
          {/* Category Dropdown */}
          <div className="filter-section">
            <button 
              className={`filter-header ${isCategoryOpen ? 'open' : ''}`}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span>Category</span>
              <ChevronDown size={20} />
            </button>
            {isCategoryOpen && (
              <div className="filter-content">
                <div className="filter-options">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`sidebar-filter-btn ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Slider Section with Toggle */}
          <div className="filter-section">
            <button 
              className={`filter-header ${isPriceOpen ? 'open' : ''}`}
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <span>Pricing</span>
              <ChevronDown size={20} />
            </button>
            {isPriceOpen && (
              <div className="filter-content">
                <div className="price-slider-container">
                  <div className="price-display">
                    <span>₹0</span>
                    <span>₹{priceRange.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    className="price-range-input"
                    min="0"
                    max={maxCoursePrice}
                    step="0.01"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseFloat(e.target.value))}
                  />
                  <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
                    Max: ₹{maxCoursePrice.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="explore-main-content">
          <div className="results-header">
            <span className="results-count">
              Showing <b>{filteredCourses.length}</b> results
            </span>
          </div>

          <div className="content-wrapper" style={{ minHeight: '400px', position: 'relative' }}>
            {isLoading ? (
              <div className="loading-overlay">
                <Loader2 className="animate-spin" size={40} color="#0f4c81" />
              </div>
            ) : (
              <div className="card-grid">
                {filteredCourses.length ? (
                  filteredCourses.map((course) => (
                    <div className="explore-course-card" key={course._id}>
                      <div className="image-wrapper">
                        <img src={course.image} alt={course.title} />
                        <span className="explore-badge">{course.category}</span>
                      </div>

                      <div className="explore-card-content">
                        <h3>{course.title}</h3>
                        <div className="card-tutor">
                          <User size={14} />
                          <span>{course.tutorId?.fullName || course.instructor?.name}</span>
                        </div>
                        <div className="explore-card-footer">
                          <span className="price">₹{course.price}</span>
                          <button className="details-btn" onClick={() => navigate(`/course/${course._id}`)}>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results">No results found matching your criteria</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExploreCourses;
