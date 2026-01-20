import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User } from "lucide-react";
import Navbar from "../components/BlogNavbar";
import BlogCard from "../components/BlogCard";
import { blogStorage } from "../BlogData/storage";
import './BlogsPage.css';

const CATEGORIES = ["All", "AI", "Coding", "Productivity", "Others"];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = blogStorage.getAll();
      setBlogs(data);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter(blog => blog.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="main-content container">
        <div style={{ textAlign: "center", marginBottom: "60px", paddingTop: "40px" }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "3.5rem", marginBottom: "16px", fontWeight: 800 }}
          >
            Upskillr Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}
          >
            Explore the latest insights from our community of learners and experts.
          </motion.p>
        </div>

        <div style={{ 
          display: "flex", 
          gap: "12px", 
          justifyContent: "center", 
          marginBottom: "40px",
          flexWrap: "wrap"
        }}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-filter ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex-center" style={{ minHeight: "300px" }}>
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "32px"
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} onReadMore={(b) => setSelectedBlog(b)} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  style={{ gridColumn: "1 / -1", textAlign: "center" }}
                >
                  <div className="empty-state">
                    <h3>No blogs found</h3>
                    <p>Start writing to share your knowledge!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedBlog(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <span className="category-tag">{selectedBlog.category}</span>
                <h2 style={{ fontSize: "2.5rem", margin: "20px 0", color: "var(--text-primary)", fontWeight: 800 }}>{selectedBlog.title}</h2>
                <div className="blog-meta-detailed">
                  <span><User size={18} /> {selectedBlog.author}</span>
                  <span><Calendar size={18} /> {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              
              <div className="modal-body">
                {selectedBlog.content.split('\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: "1.5rem", lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1.1rem" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
