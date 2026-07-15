import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaBolt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import logoImg from '../assets/tech-riwaayat.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={logoImg} alt="Tech Riwaayat Logo" style={{ height: '80px', width: 'auto', marginBottom: '-10px', marginTop: '-10px', transform: 'scale(1.9)', transformOrigin: 'left center' }} />
            </div>
            <p className="footer-description">
              Empowering businesses globally with next-gen digital solutions. We blend innovative technology with flawless execution to drive real growth.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/people/TechRiwaayat/61588163576240/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/company/tech-riwaayat/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/techriwaayat/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/"><FaChevronRight className="link-icon" /> Home</Link></li>
              <li><Link to="/about"><FaChevronRight className="link-icon" /> About Us</Link></li>
              <li><Link to="/company"><FaChevronRight className="link-icon" /> Company</Link></li>
              <li><Link to="/blog"><FaChevronRight className="link-icon" /> Blog</Link></li>
              <li><Link to="/contact"><FaChevronRight className="link-icon" /> Contact</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/custom-software"><FaChevronRight className="link-icon" /> Custom Software</Link></li>
              <li><Link to="/services/web-development"><FaChevronRight className="link-icon" /> Web Development</Link></li>
              <li><Link to="/services/mobile-app-development"><FaChevronRight className="link-icon" /> Mobile Apps</Link></li>
              <li><Link to="/services/e-commerce-development"><FaChevronRight className="link-icon" /> E-Commerce</Link></li>
              <li><Link to="/services/ai-automation"><FaChevronRight className="link-icon" /> AI Integrations</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>TeamTechRiwaayat@gmail.com</span>
              </li>
              <li className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <span>+92 3263 555252</span>
              </li>
              <li className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container bottom-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Tech Riwaayat. All rights reserved.
          </p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
