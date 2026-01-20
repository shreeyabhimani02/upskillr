import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowRight, User } from "lucide-react";
import "../index.css";

export default function BlogCard({ blog, onReadMore }) {
  // Truncate content for preview
  const preview = blog.content.length > 150 
    ? blog.content.substring(0, 150) + "..." 
    : blog.content;

  const formattedDate = blog.createdAt 
    ? format(new Date(blog.createdAt), "MMMM dd, yyyy") 
    : "Unknown date";

  return (
    <motion.article 
      className="blog-card"
      whileHover={{ y: -8, boxShadow: "var(--shadow-lg)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <span className="category-tag">{blog.category}</span>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {formattedDate}
          </span>
        </div>
        
        <h3 style={{ 
          fontSize: "1.5rem", 
          marginBottom: "12px",
          color: "var(--text-primary)",
          fontWeight: "700"
        }}>
          {blog.title}
        </h3>
        
        <p style={{ 
          color: "var(--text-secondary)", 
          lineHeight: "1.6",
          marginBottom: "24px" 
        }}>
          {preview}
        </p>
      </div>

      <div style={{ 
        borderTop: "1px solid var(--border-color)", 
        paddingTop: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            color: "var(--primary-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(37, 99, 235, 0.2)"
          }}>
            <User size={16} />
          </div>
          <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{blog.author}</span>
        </div>
        <motion.button 
          onClick={() => onReadMore(blog)}
          className="read-more-btn"
          whileHover={{ x: 5 }}
        >
          Read More <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.article>
  );
}

