import { FaCheckCircle, FaLightbulb, FaUsers, FaTrophy } from 'react-icons/fa'
import './AboutSection.css'

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-section-container">
        <div className="about-section-header">
          <h2 className="about-section-title">Why Choose Tech Riwayaat?</h2>
          <p className="about-section-desc">
            We're more than just a development agency. We're your digital transformation partner.
          </p>
        </div>

        <div className="about-section-grid">
          <div className="about-section-card">
            <div className="about-card-icon">
              <FaCheckCircle />
            </div>
            <h3>Quality Assured</h3>
            <p>Every project undergoes rigorous testing and quality checks to ensure excellence.</p>
          </div>

          <div className="about-section-card">
            <div className="about-card-icon">
              <FaLightbulb />
            </div>
            <h3>Innovation First</h3>
            <p>We stay ahead of technology trends and implement cutting-edge solutions.</p>
          </div>

          <div className="about-section-card">
            <div className="about-card-icon">
              <FaUsers />
            </div>
            <h3>Expert Team</h3>
            <p>Our experienced developers and designers are passionate about creating exceptional products.</p>
          </div>

          <div className="about-section-card">
            <div className="about-card-icon">
              <FaTrophy />
            </div>
            <h3>Proven Track Record</h3>
            <p>Our successful projects and satisfied clients have established us as a trusted technology partner.</p>
          </div>
        </div>

        <div className="about-section-content">
          <p>
            From startups to enterprises, we've helped businesses of all sizes achieve their digital goals. 
            Our commitment to quality, innovation, and customer satisfaction has made us a trusted partner 
            for digital transformation.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
