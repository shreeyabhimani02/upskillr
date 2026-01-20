import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/upskillr-logo.png";
import userIcon from "../assets/user.png";
import languageIcon from "../assets/foreign-language.png";
import SearchInput from "../components/SearchInput";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="UPSKILLR" />
        </div>

        {/* Navigation */}
        <ul className="nav-links">
          <li>
            <button className="nav-link-btn" onClick={() => navigate("/courses")}>
              Explore
            </button>
          </li>
          <li>
            <button className="nav-link-btn" onClick={() => navigate("/blogs")}>
              Blogs
            </button>
          </li>
        </ul>

        {/* Search */}
        <SearchInput />

        {/* Right Icons */}
        <div className="navbar-icons">

          {/* Language */}
          <button className="icon-button">
            <img src={languageIcon} alt="Language" />
          </button>

          {/* AUTH SECTION */}
          {!user ? (
            <button
              className="login-btn"
              onClick={() => navigate("/auth")}
            >
              Login
            </button>
          ) : (
            <div className="profile-wrapper">
              <div
                className="profile-avatar"
                onClick={() => setShowMenu(!showMenu)}
              >
                {/* {user?.fullName?.charAt(0).toUpperCase()} */}
                {user?.fullName
                  ? user.fullName.charAt(0).toUpperCase()
                  : "U"}

              </div>
              {showMenu && (
                <div className="profile-dropdown">
                  <p
                    onClick={() => {
                      setShowMenu(false); // close menu on click
                      if (!user) {
                        navigate("/auth");
                        return;
                      }

                      // Safe check for role
                      const role = user.role?.toLowerCase();
                      if (role === "student") navigate("/learner-dashboard");
                      else if (role === "instructor") navigate("/tutor-dashboard");
                      else navigate("/"); // fallback
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      setShowMenu(false); // close menu after logout
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </p>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

