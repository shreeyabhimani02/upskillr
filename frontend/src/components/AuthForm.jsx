import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthForm = () => {
  const initialFormData = {
    fullName: "",
    dob: "",
    contact: "",
    qualification: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const { login } = useAuth();

  /* 🔄 RESET FORM */
  useEffect(() => {
    setFormData(initialFormData);
    setError("");
  }, [isLogin, role]);

  /* 🔐 GOOGLE LOGIN */
  useEffect(() => {
    if (!window.google || !isLogin) return;

    window.google.accounts.id.initialize({
      client_id:
        "420526056434-k5lp1i9dlm5v8at37s3n0h2cgapj3g1t.apps.googleusercontent.com",
      callback: async (response) => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: response.credential }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          localStorage.setItem("token", data.token);
          
          localStorage.setItem("token", data.token);

          login({
            _id: data.user._id,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role,
          });
 
          navigate("/");     
          alert("Google login successful!");
        } catch {
          setError("Google login failed");
        }
      },
    });

    const btn = document.getElementById("google-btn");
    if (btn) {
      btn.innerHTML = "";
      window.google.accounts.id.renderButton(btn, {
        theme: "outline",
        size: "large",
        width: 320,
      });
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      /* SIGNUP */
      if (!isLogin) {
        if (formData.password.length < 6)
          return setError("Password must be at least 6 characters");

        if (formData.password !== formData.confirmPassword)
          return setError("Passwords do not match");

        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, role }),
        });

        const data = await res.json();
        if (!res.ok) return setError(data.message || "Signup failed");

        alert("Signup successful! Please login.");
        setIsLogin(true);
        return;
      }

      /* LOGIN */
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Login failed");

      login({
        _id: data.user._id,
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      navigate("/");
      alert("Login successful!");
  

    } catch {
      setError("Server error");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="main-navbar">
        <div className="nav-content">
          <div className="platform-name">UPSKILLR</div>
          <div className="nav-actions">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* AUTH */}
      <div className="auth-container">
        <div className="auth-layout">
          <div className="auth-visual">
            <h1>{isLogin ? "Start Your Journey" : "Learn. Teach. Grow."}</h1>
            <p>
              {isLogin
                ? "Login to continue learning or teaching."
                : "Join UPSKILLR and level up your skills."}
            </p>
          </div>

          <div className="auth-card">
            {/* 🔥 CORRECT STRUCTURE */}
            <div className="form-panel">
              <form onSubmit={handleSubmit}>
                <h2>{isLogin ? "Login" : "Create Account"}</h2>

                <div className="role-selector">
                  <button type="button" className={role === "student" ? "active" : ""} onClick={() => setRole("student")}>
                    Student
                  </button>
                  <button type="button" className={role === "instructor" ? "active" : ""} onClick={() => setRole("instructor")}>
                    Instructor
                  </button>
                </div>

                {!isLogin && (
                  <>
                    <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />

                    {role === "student" && (
                      <>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} max={new Date().toISOString().split("T")[0]} required />
                        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                      </>
                    )}

                    {role === "instructor" && (
                      <>
                        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                        <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required />
                      </>
                    )}
                  </>
                )}

                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                {!isLogin && (
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                )}

                {isLogin && <div id="google-btn" className="google-section"></div>}

                {error && <p className="error-text">{error}</p>}

                <button className="submit-btn">{isLogin ? "Login" : "Sign Up"}</button>

                <p className="toggle-text">
                  {isLogin ? (
                    <>New here? <span onClick={() => setIsLogin(false)}>Create account</span></>
                  ) : (
                    <>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
