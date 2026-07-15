import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaUserTie, FaClock, FaHeadset } from 'react-icons/fa';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-box" data-aos="zoom-in">
          <span className="cta-label">READY TO BUILD</span>
          <h2 className="cta-title">Hire a <span className="highlight">Tech Riwaayat</span> Pro Today</h2>
          <p className="cta-description">
            Get access to the world's best tech talent — expert developers, designers, and AI engineers ready to unlock the full potential of your next project.
          </p>

          <div className="cta-features">
            <div className="cta-feature-item">
              <FaCheckCircle className="cta-icon" />
              <span>No lock-in contracts</span>
            </div>
            <div className="cta-feature-item">
              <FaUserTie className="cta-icon" />
              <span>Dedicated project manager</span>
            </div>
            <div className="cta-feature-item">
              <FaClock className="cta-icon" />
              <span>On-time delivery guarantee</span>
            </div>
            <div className="cta-feature-item">
              <FaHeadset className="cta-icon" />
              <span>24/7 support</span>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn" style={{textDecoration: 'none'}}>
              START A PROJECT
              <span className="arrow">→</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary cta-btn" style={{textDecoration: 'none'}}>
              SCHEDULE A CALL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
