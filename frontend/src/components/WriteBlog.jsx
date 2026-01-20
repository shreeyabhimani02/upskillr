import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, User, Tag, FileText } from "lucide-react";
import { blogStorage } from "../BlogData/storage";
import { insertBlogSchema } from "../BlogData/schema";
import { z } from "zod";
import "./WriteBlog.css";

const CATEGORIES = ["AI", "Coding", "Productivity", "Others"];

export default function WriteBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "AI",
    content: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      insertBlogSchema.parse(formData);
      await new Promise(resolve => setTimeout(resolve, 800));
      blogStorage.add(formData);
      navigate("/blogs");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.issues.forEach(error => {
          if (error.path[0]) {
            fieldErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      
      <main className="main-content container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "32px" 
          }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Create New Blog</h1>
            <motion.button 
              onClick={() => navigate("/blogs")}
              className="btn btn-blog btn-with-icon"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={18} style={{ marginRight: "8px" }} />
              Back to Blogs
            </motion.button>
          </div>

          <div className="write-blog-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  <FileText size={16} style={{ verticalAlign: "middle", marginRight: "4px" }} /> Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Give your blog a catchy title..."
                  style={{ borderColor: errors.title ? "var(--danger)" : undefined }}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="author">
                    <User size={16} style={{ verticalAlign: "middle", marginRight: "4px" }} /> Author Name
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Who is writing this?"
                    style={{ borderColor: errors.author ? "var(--danger)" : undefined }}
                  />
                  {errors.author && <span className="error-message">{errors.author}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="category">
                    <Tag size={16} style={{ verticalAlign: "middle", marginRight: "4px" }} /> Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Share your insights and knowledge with the world..."
                  rows={12}
                  style={{ borderColor: errors.content ? "var(--danger)" : undefined }}
                />
                {errors.content && <span className="error-message">{errors.content}</span>}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
                <motion.button
                  type="submit"
                  className="btn btn-primary btn-lg btn-with-icon"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? "Publishing..." : (
                    <>
                      <Send size={18} style={{ marginRight: "10px" }} />
                      Publish Blog
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
