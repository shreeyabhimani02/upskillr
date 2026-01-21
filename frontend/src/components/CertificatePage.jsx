import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Certificate from "./Certificate";
import "./CertificatePage.css";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CertificatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error("Course fetch error", err));
  }, [id]);

  /* ================= CHECK COMPLETION FROM DB ================= */
  useEffect(() => {
    if (!token) return;

    const checkCompletion = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/enrollment/my-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const completed = data.find(
          c => c._id === id && c.progress === 100
        );

        setIsCompleted(!!completed);
      } catch (err) {
        console.error("Completion check failed", err);
        setIsCompleted(false);
      }
    };

    checkCompletion();
  }, [id, token]);

  /* ================= CERTIFICATE META ================= */
  useEffect(() => {
    const savedCert = JSON.parse(
      localStorage.getItem(`certificate_${id}`)
    );

    if (savedCert) {
      setCertificateId(savedCert.certificateId);
      setIssueDate(savedCert.issueDate);
    } else {
      const newCertId = `UPSK-${id}-${Date.now().toString().slice(-6)}`;
      const date = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const certData = {
        certificateId: newCertId,
        issueDate: date,
      };

      localStorage.setItem(
        `certificate_${id}`,
        JSON.stringify(certData)
      );

      setCertificateId(newCertId);
      setIssueDate(date);
    }
  }, [id]);

  /* ================= GUARDS ================= */
  if (!isCompleted) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Complete the course to unlock your certificate 🎓
      </h2>
    );
  }

  if (!course) {
    return <h2 style={{ textAlign: "center" }}>Loading certificate...</h2>;
  }

  return (
    <div className="certificate-page">
      <div style={{ padding: "30px", textAlign: "center" }}>
        <button
          className="back-btnn"
          onClick={() => navigate(`/course/${id}`)}
        >
          ← Back to Course
        </button>
      </div>

      <Certificate
        userName={user?.fullName || "Learner"}
        courseName={course.title}
        certificateId={certificateId}
        issueDate={issueDate}
      />
    </div>
  );
}

export default CertificatePage;

