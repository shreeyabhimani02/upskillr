import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import "./Reviews.css";

const reviews = [
  {
    id: 1,
    name: "Kiara Sharma",
    rating: 5,
    feedback: "Upskillr helped me crack my first developer role. The content is practical and industry-ready.",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Sneha Patel",
    rating: 5,
    feedback: "Very structured courses with great mentors. Feels premium and easy to follow.",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Rohit Verma",
    rating: 4,
    feedback: "Loved the hands-on projects and community support. Highly recommended!",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
];

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="reviews-header">
        <h2>Loved by 10,000+ learners everywhere</h2>
        <p>Join thousands of students who have transformed their careers through our platform</p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="review-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
          >
            <Quote className="quote-icon" />

            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? "star filled" : "star"}>
                  ★
                </span>
              ))}
            </div>

            <p className="review-text">"{review.feedback}"</p>

            <div className="review-user">
              <img src={review.avatarUrl} alt={review.name} />
              <div>
                <h4>{review.name}</h4>
                <span>Verified Learner</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
