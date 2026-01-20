import "./Footer.css";
import logo from "../assets/upskillr-logo.png"; // update path if needed
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Brand */}
          <div className="footer-brand">
            <img src={logo} alt="UPSKILLR" className="footer-logo" />
            <p className="footer-description">
              Empowering learners worldwide to master new skills and achieve
              their career goals through world-class education.
            </p>

            <div className="footer-socials">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Platform */}
          <FooterColumn title="Platform">
            <FooterLink href="/">Browse Courses</FooterLink>
            <FooterLink href="/">Mentorship</FooterLink>
            <FooterLink href="/">For Business</FooterLink>
            <FooterLink href="/">Pricing</FooterLink>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink href="/">About Us</FooterLink>
            <FooterLink href="/">Careers</FooterLink>
            <FooterLink href="/">Blog</FooterLink>
            <FooterLink href="/">Contact</FooterLink>
          </FooterColumn>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Latest course releases and industry insights.</p>

            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Upskillr Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable components */

function FooterColumn({ title, children }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul>{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  );
}
