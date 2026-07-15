import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaLaptopCode, FaMobileAlt, FaRobot, FaWordpress, FaArrowRight, FaComments } from 'react-icons/fa'
import './Hero.css'

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;
    const endValue = parseInt(end.replace(/\D/g, ''));
    
    if (isNaN(endValue)) {
      setCount(end);
      return;
    }

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(endValue * easeOut));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const Hero = () => {
  const services = [
    { id: 1, name: 'WEB DESIGN & DEV', icon: FaLaptopCode },
    { id: 2, name: 'MOBILE APPS', icon: FaMobileAlt },
    { id: 3, name: 'AGENTIC AI', icon: FaRobot },
    { id: 4, name: 'WORDPRESS', icon: FaWordpress },
  ]

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-icon">●</span>
            <span className="badge-text">Tech Riwaayat</span>
            <span className="badge-dot">●</span>
            <span className="badge-highlight">AGENCY DIRECTORY</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Expert <span className="highlight">Web Development</span>
            <br />
            & AI Automation Agency
          </h1>

          {/* Tagline - Single Line */}
          <p className="hero-tagline">
            ELEVATING <span className="highlight">BUSINESSES</span> WITH <span className="normal">CUSTOM DIGITAL SOLUTIONS</span>
          </p>

          {/* Description */}
          <p className="hero-description">
            Tech Riwayaat is a premier digital agency providing expert solutions in <strong>Custom Web Development</strong>, 
            <strong>Mobile Apps</strong>, <strong>Agentic AI</strong>, and <strong>WordPress</strong>. We partner with global brands to deliver 
            high-performance, SEO-optimized, and scalable digital experiences that drive growth and maximize ROI.
          </p>

          {/* Service Badges */}
          <div className="service-badges">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <div key={service.id} className="service-badge">
                  <span className="badge-icon"><IconComponent /></span>
                  <span className="badge-label">{service.name}</span>
                </div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <a href="#services" className="btn btn-primary" style={{textDecoration: 'none'}}>
              Explore Services
              <FaArrowRight className="arrow-icon" style={{marginLeft: '6px'}} />
            </a>
            <Link to="/contact" className="btn btn-secondary" style={{textDecoration: 'none'}}>
              <FaComments className="icon" style={{marginRight: '6px'}} /> Let's Talk
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="trust-badge">
            <span className="trust-text">
              <span className="trust-main-text"><span className="trust-icon">★</span> TRUSTED BY 100+ CLIENTS GLOBALLY</span>
              <span className="trust-separator"> · </span>
              <span className="trust-rating">RATED <span className="rating">4.9 / 5.0</span></span>
            </span>
          </div>

          {/* Inline Stats */}
          <div className="hero-inline-stats">
            <div className="inline-stat">
              <span className="stat-num"><AnimatedCounter end="30" suffix="+" /></span>
              <span className="stat-text">Projects Completed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="inline-stat">
              <span className="stat-num"><AnimatedCounter end="98" suffix="%" /></span>
              <span className="stat-text">Client Satisfaction</span>
            </div>
            <div className="stat-divider"></div>
            <div className="inline-stat">
              <span className="stat-num"><AnimatedCounter end="500" suffix="k+" /></span>
              <span className="stat-text">Lines of Code</span>
            </div>
            <div className="stat-divider"></div>
            <div className="inline-stat">
              <span className="stat-num"><AnimatedCounter end="3" suffix="+" /></span>
              <span className="stat-text">Countries Served</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
