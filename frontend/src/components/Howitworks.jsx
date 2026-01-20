import { motion } from "framer-motion";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Choose Your Course", desc: "Select from our vast library of courses curated by industry experts." },
    { number: "02", title: "Learn at Your Pace", desc: "Access high-quality video lessons and materials anytime, anywhere." },
    { number: "03", title: "Get Certified", desc: "Complete the course and earn a globally recognized certificate." },
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="sections">How It Works</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="step-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <span className="step-num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
