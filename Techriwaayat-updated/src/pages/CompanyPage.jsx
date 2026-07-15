import React, { useEffect } from 'react'
import { FaBuilding, FaGlobe, FaTrophy, FaHandshake, FaChartPie, FaLightbulb, FaCheckCircle, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './CompanyPage.css'
import AOS from 'aos'

const CompanyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  return (
    <div className="company-page">
      {/* Hero Section */}
      <section className="company-hero">
        <div className="company-hero-container" data-aos="fade-up">
          <span className="company-badge"><FaBuilding className="badge-icon" /> CORPORATE OVERVIEW</span>
          <h1 className="company-main-title">Redefining <span className="highlight">Digital</span> Innovation</h1>
          <p className="company-hero-description">We are a forward-thinking technology company committed to building scalable software solutions that drive business transformation across the globe.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="company-stats-section">
        <div className="stats-container">
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="0">
            <div className="stat-icon-wrapper"><FaTrophy /></div>
            <h3>30+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="stat-icon-wrapper"><FaHandshake /></div>
            <h3>98%</h3>
            <p>Client Retention</p>
          </div>
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="stat-icon-wrapper"><FaUsers /></div>
            <h3>8+</h3>
            <p>Expert Team</p>
          </div>
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="stat-icon-wrapper"><FaGlobe /></div>
            <h3>Global</h3>
            <p>Reach & Impact</p>
          </div>
        </div>
      </section>

      <div className="company-content-wrapper">
        
        {/* Core Identity */}
        <section className="content-section" data-aos="fade-up">
          <div className="section-header text-center">
            <h2><FaLightbulb className="emoji-icon" /> Our Core Identity</h2>
          </div>
          <div className="identity-grid">
            <div className="identity-card dark-card">
              <h3 className="card-heading">Our Mission</h3>
              <p>To empower businesses globally by delivering cutting-edge, scalable, and beautifully designed digital solutions. We exist to transform complex operational bottlenecks into seamless software ecosystems, ensuring our clients outpace their competition.</p>
            </div>
            <div className="identity-card outline-card">
              <h3 className="card-heading">Our Vision</h3>
              <p>To be recognized as the premier technology partner for forward-thinking enterprises. We envision a future where 'Tech Riwaayat' is synonymous with uncompromising code quality, relentless innovation, and unmatched client success.</p>
            </div>
          </div>
        </section>

        {/* Our Work Culture */}
        <section className="content-section" data-aos="fade-up">
          <div className="section-header text-center">
            <h2><FaUsers className="emoji-icon" /> Our Work Culture</h2>
          </div>
          <div className="culture-content text-center" style={{maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: '#555', lineHeight: '1.8'}}>
            <p>At Tech Riwaayat, we don't just write code; we build digital assets. Our culture is deeply rooted in <strong>continuous learning, extreme ownership, and engineering excellence</strong>. We maintain a flat hierarchy where the best idea always wins, regardless of who proposes it. We believe in providing our engineers with the autonomy to innovate, the tools to succeed, and the mentorship to grow into industry leaders.</p>
          </div>
          <div className="culture-highlights mt-5" style={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap'}}>
            <div className="culture-highlight-item" style={{background: '#fff', padding: '20px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', flex: '1', minWidth: '200px'}}>
              <FaCheckCircle style={{color: '#00d97e', fontSize: '30px', marginBottom: '15px'}} />
              <h4 style={{margin: '0 0 10px', fontSize: '18px'}}>Zero Bureaucracy</h4>
              <p style={{margin: '0', fontSize: '14px', color: '#666'}}>Fast decision-making and direct communication.</p>
            </div>
            <div className="culture-highlight-item" style={{background: '#fff', padding: '20px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', flex: '1', minWidth: '200px'}}>
              <FaCheckCircle style={{color: '#00d97e', fontSize: '30px', marginBottom: '15px'}} />
              <h4 style={{margin: '0 0 10px', fontSize: '18px'}}>Engineering First</h4>
              <p style={{margin: '0', fontSize: '14px', color: '#666'}}>We prioritize clean architecture and code quality above all.</p>
            </div>
            <div className="culture-highlight-item" style={{background: '#fff', padding: '20px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', flex: '1', minWidth: '200px'}}>
              <FaCheckCircle style={{color: '#00d97e', fontSize: '30px', marginBottom: '15px'}} />
              <h4 style={{margin: '0 0 10px', fontSize: '18px'}}>Client Obsession</h4>
              <p style={{margin: '0', fontSize: '14px', color: '#666'}}>Our success is strictly measured by our clients' ROI.</p>
            </div>
          </div>
        </section>

        {/* Our Methodology */}
        <section className="content-section" data-aos="fade-up">
          <div className="section-header text-center">
            <h2><FaChartPie className="emoji-icon" /> Our Methodology</h2>
          </div>
          <p className="section-subtitle text-center">We follow a proven, agile-driven approach to ensure every product we build is delivered on time, within budget, and to the highest quality standards.</p>
          
          <div className="methodology-timeline">
            <div className="method-step" data-aos="fade-left" data-aos-delay="100">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Discovery & Strategy</h3>
                <p>We analyze your business goals, target audience, and market landscape to build a solid strategic foundation.</p>
              </div>
            </div>
            <div className="method-step" data-aos="fade-left" data-aos-delay="200">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>UI/UX Design</h3>
                <p>Our designers craft intuitive, user-centric interfaces that offer seamless experiences across all devices.</p>
              </div>
            </div>
            <div className="method-step" data-aos="fade-left" data-aos-delay="300">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Development & Engineering</h3>
                <p>We write clean, secure, and scalable code using the latest technologies and best practices.</p>
              </div>
            </div>
            <div className="method-step" data-aos="fade-left" data-aos-delay="400">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Testing & QA</h3>
                <p>Rigorous quality assurance ensures your product is bug-free, secure, and performs flawlessly.</p>
              </div>
            </div>
            <div className="method-step" data-aos="fade-left" data-aos-delay="500">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Deployment & Support</h3>
                <p>After a smooth launch, we provide ongoing maintenance and support to keep your software running efficiently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="content-section global-section" data-aos="fade-up">
          <div className="section-header text-center">
            <h2><FaGlobe className="emoji-icon" /> Global Presence</h2>
          </div>
          <div className="locations-wrapper">
            <div className="location-card">
              <FaMapMarkerAlt className="location-icon" />
              <h3>Headquarters</h3>
              <p className="location-city">Lahore, Punjab, Pakistan</p>
              <p className="location-desc">Our main development hub where innovation happens daily.</p>
            </div>
            <div className="location-card remote-card">
              <FaGlobe className="location-icon" />
              <h3>Remote Operations</h3>
              <p className="location-city">Worldwide Delivery</p>
              <p className="location-desc">Serving clients globally with seamless remote collaboration.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="company-cta" data-aos="zoom-in">
          <h2>Ready to build something extraordinary?</h2>
          <p>Join forces with a technology partner that cares about your success as much as you do.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Start a Project</Link>
            <Link to="/team" className="btn btn-secondary cta-btn">Meet Our Team</Link>
          </div>
        </section>

      </div>
    </div>
  )
}

export default CompanyPage
