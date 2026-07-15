import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaAward, FaBullseye } from 'react-icons/fa'
import teamImage from '../assets/team-office.png'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          
          {/* Left Side: Image */}
          <div className="about-image-wrapper" data-aos="fade-right">
            <img src={teamImage} alt="Tech Riwaayat Team in Office" className="about-image" />
            <div className="experience-badge" data-aos="zoom-in" data-aos-delay="300">
              <span className="exp-number">5+</span>
              <span className="exp-text">Years of<br/>Experience</span>
            </div>
          </div>

          {/* Right Side: Text & Content */}
          <div className="about-content" data-aos="fade-left">
            <span className="about-label">WHO WE ARE</span>
            <h2 className="about-title">
              We Build Trust Through <span className="highlight">Excellence</span>
            </h2>
            <p className="about-description">
              At Tech Riwaayat, we are a passionate team of engineers, designers, and strategists. We believe in creating digital solutions that not only look stunning but drive measurable growth and ensure absolute precision in every line of code we write.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div>
                  <h4 className="feature-title"><FaAward className="feature-icon" /> Proven Experience</h4>
                  <p className="feature-text">Decades of combined expertise delivering scalable software and robust applications globally.</p>
                </div>
              </div>

              <div className="about-feature">
                <div>
                  <h4 className="feature-title"><FaBullseye className="feature-icon" /> Our Mission</h4>
                  <p className="feature-text">To empower businesses worldwide by blending innovative technology with flawless execution.</p>
                </div>
              </div>
            </div>

            <Link to="/about" className="about-btn" style={{textDecoration: 'none', display: 'inline-block'}}>
              Discover Our Journey <span className="arrow">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
