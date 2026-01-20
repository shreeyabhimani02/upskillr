import { motion } from "framer-motion";
import student3 from "../assets/student3.jpg";
import student2 from "../assets/student2.png";
import student1 from "../assets/student1.png";
import GetStartedButton from "./GetStartedButton";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Master Tomorrow’s Skills <br /> <span> Shape Your Future Today <br /> </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          World-class courses designed by professionals to help you grow skills that companies actually hire for        
        </motion.p>
        <motion.div 
          className="hero-btns"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GetStartedButton/>
        </motion.div>
      </div>
      <div className="hero-images">
        <motion.div
            className="image-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -12, scale: 1 }}
        >
            <img src={student1} alt="Student" />
        </motion.div>

        <motion.div
            className="image-card featured"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -30 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -45, scale: 1 }}
        >
            <img src={student2} alt="Student" />
        </motion.div>

        <motion.div
            className="image-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ y: -12, scale: 1 }}
        >
            <img src={student3} alt="Student" />
        </motion.div>
</div>

    </section>
  );
};

export default Hero;
