import { motion } from "framer-motion";
import { Globe2, Briefcase, GraduationCap } from "lucide-react";
import "./Placements.css";

const Placements = () => {
  const partners = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Atlassian", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/640px-Atlassian-logo.svg.png" },
    { name: "Goldman Sachs", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Goldman_Sachs_2022_Black.svg/640px-Goldman_Sachs_2022_Black.svg.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/IBM_logoBerdaiOthmane.png/640px-IBM_logoBerdaiOthmane.png" },
    { name: "JP Morgan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/J_P_Morgan_Logo_2008.svg/640px-J_P_Morgan_Logo_2008.svg.png" },
    { name: "Nvidia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NVIDIA_logo.svg/640px-NVIDIA_logo.svg.png" },
  ];

  return (
    <section className="placements">
      <div className="container">
        <motion.div 
          className="placements-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">Placement Partners</span>
          <h2>Our Graduates Work at Top Global Companies</h2>
          <p>We've partnered with 200+ companies to ensure our students get the best career opportunities.</p>
        </motion.div>
        
        <div className="partners-carousel">
          <div className="partners-track">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Placements;
