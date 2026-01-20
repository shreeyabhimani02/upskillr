import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import CoursesCarousel from "./components/CoursesCarousel";
import HowItWorks from "./components/Howitworks";
import Placements from "./components/Placements";
import ExploreCourses from "./components/ExploreCourses";
import CourseDetails from "./components/CourseDetails";
import CourseVideos from "./components/CourseVideos";
import AuthForm from "./components/AuthForm";
import LearnerDashboard from "./components/LearnerDashboard";
import TutorDashboard from "./components/TutorDashboard";
import CertificatePage from "./components/CertificatePage";
import BlogsPage from "./components/BlogsPage";
import WriteBlog from "./components/WriteBlog";

/* 🔹 Wrapper to control Navbar visibility */
function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/videos", "/learner-dashboard","/tutor-dashboard","/certificate","/blogs","/writeblogs"];

  const hideNavbar = hideNavbarRoutes.some(route =>
    location.pathname.includes(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* AUTH */}
        <Route path="/auth" element={<AuthForm />} />

        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CoursesCarousel />
              <HowItWorks />
              <Placements />
              <Reviews />
            </>
          }
        />

        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />


        {/* COURSES */}
        <Route path="/courses" element={<ExploreCourses />} />
        <Route path="/explore-courses" element={<ExploreCourses />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/writeblogs" element={<WriteBlog />} />

        {/* COURSE DETAILS */}
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* COURSE VIDEOS (NO NAVBAR) */}
        <Route path="/course/:courseId/videos" element={<CourseVideos />} />

        <Route path="/certificate/:id" element={<CertificatePage />} />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>Page Not Found</h2>}
        />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

function App() {
  return <Layout />;   // ✅ NO ROUTER HERE
}

export default App;