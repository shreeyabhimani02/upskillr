import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PenSquare } from "lucide-react";
import logoImg  from "../assets/upskillr-logo.png";
import "../index.css";

const navStyles = {
  header: {
    backgroundColor: "var(--surface-white)",
    borderBottom: "1px solid var(--border-color)",
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.9)",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    cursor: "pointer",
  },
  logoImage: {
    height: "50px",
    width: "auto",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
};

export default function Navbar() {
  const location = useLocation();

  return (
    <header style={navStyles.header}>
      <div className="container" style={navStyles.navContainer}>
        {/* Logo Section */}
        <Link to="/">
          <motion.div 
            style={navStyles.logoSection}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logoImg} alt="Upskillr Logo" style={navStyles.logoImage} />
          </motion.div>
        </Link>

        <nav style={navStyles.navLinks}>
          <Link to="/writeblogs">
            <motion.button 
              className="btn btn-primary btn-with-icon"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <PenSquare size={18} style={{ marginRight: "8px" }} />
              Write Blog
            </motion.button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
