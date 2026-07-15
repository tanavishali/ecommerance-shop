import React, { useEffect } from 'react'
import { FaCheckCircle, FaBookOpen, FaUsers, FaBullseye, FaGlobe, FaHeart, FaCogs, FaRocket, FaChartLine, FaHandshake } from 'react-icons/fa'
import './AboutPage.css'
import AOS from 'aos'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" data-aos="fade-up">
        <div className="about-hero-container">
          <span className="about-badge">ABOUT US</span>
          <h1 className="about-main-title">Building Modern Digital <span className="highlight">Experiences</span></h1>
        </div>
      </section>

      <div className="about-content-wrapper">
        {/* Story & Who We Are */}
        <section className="content-section" data-aos="fade-up">
          <div className="section-header">
            <h2><FaBookOpen className="emoji-icon" /> Our Story</h2>
          </div>
          <p>Every successful business starts with a vision, and so did ours. We founded our company with a simple goal: to create powerful digital solutions that help businesses grow faster and operate smarter.</p>
          <p>Over the years, we have worked with startups, small businesses, and growing enterprises, transforming their ideas into high-quality software products. Every project has strengthened our experience and inspired us to deliver even better solutions.</p>
          <p>Today, we continue to innovate, embrace new technologies, and build products that make a real difference for our clients.</p>
        </section>

        <section className="content-section" data-aos="fade-up">
          <div className="section-header">
            <h2><FaUsers className="emoji-icon" /> Who We Are</h2>
          </div>
          <p>We are a team of passionate developers, designers, and technology experts dedicated to creating modern digital experiences. Our expertise includes web development, custom software, mobile applications, UI/UX design, cloud solutions, and business automation.</p>
          <p>Every solution we create is built with performance, security, scalability, and user experience in mind. We don't just write code—we solve business problems through technology.</p>
        </section>

        {/* Mission & Vision */}
        <div className="split-grid">
          <section className="content-section card-style" data-aos="fade-right">
            <div className="section-header">
              <h2><FaBullseye className="emoji-icon" /> Our Mission</h2>
            </div>
            <p>Our mission is to empower businesses with innovative software solutions that improve productivity, simplify operations, and accelerate digital growth.</p>
            <p>We focus on delivering reliable, secure, and scalable products that help our clients stay ahead in an ever-changing digital world.</p>
          </section>

          <section className="content-section card-style" data-aos="fade-left">
            <div className="section-header">
              <h2><FaGlobe className="emoji-icon" /> Our Vision</h2>
            </div>
            <p>Our vision is to become a globally recognized technology company known for innovation, quality, and long-term client partnerships.</p>
            <p>We aim to shape the future by building intelligent software that creates meaningful impact across industries.</p>
          </section>
        </div>

        {/* Core Values */}
        <section className="content-section" data-aos="fade-up">
          <div className="section-header">
            <h2><FaHeart className="emoji-icon" /> Our Core Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-box">
              <h3>Innovation</h3>
              <p>We embrace new technologies and creative thinking to build future-ready solutions.</p>
            </div>
            <div className="value-box">
              <h3>Quality</h3>
              <p>Every project is developed with attention to detail, clean architecture, and industry best practices.</p>
            </div>
            <div className="value-box">
              <h3>Transparency</h3>
              <p>We believe in honest communication and keeping our clients involved throughout the development process.</p>
            </div>
            <div className="value-box">
              <h3>Client Success</h3>
              <p>Your success is our success. We build solutions that create measurable business value.</p>
            </div>
          </div>
        </section>

        {/* What We Do & Why Choose Us */}
        <div className="split-grid">
          <section className="content-section card-style" data-aos="fade-up" data-aos-delay="100">
            <div className="section-header">
              <h2><FaCogs className="emoji-icon" /> What We Do</h2>
            </div>
            <p>We provide end-to-end software development services designed to help businesses succeed in the digital age.</p>
            <h4 className="list-title">Our Services</h4>
            <ul className="custom-list">
              <li><FaCheckCircle className="list-icon" /> Custom Software Development</li>
              <li><FaCheckCircle className="list-icon" /> Web Application Development</li>
              <li><FaCheckCircle className="list-icon" /> Mobile App Development</li>
              <li><FaCheckCircle className="list-icon" /> UI/UX Design</li>
              <li><FaCheckCircle className="list-icon" /> E-commerce Solutions</li>
              <li><FaCheckCircle className="list-icon" /> Cloud Integration</li>
              <li><FaCheckCircle className="list-icon" /> API Development</li>
              <li><FaCheckCircle className="list-icon" /> Business Automation</li>
              <li><FaCheckCircle className="list-icon" /> Technical Support & Maintenance</li>
            </ul>
          </section>

          <section className="content-section card-style" data-aos="fade-up" data-aos-delay="200">
            <div className="section-header">
              <h2><FaRocket className="emoji-icon" /> Why Choose Us</h2>
            </div>
            <p>Choosing the right technology partner can make all the difference. We combine technical expertise, creative thinking, and a client-first approach to deliver software that performs exceptionally.</p>
            <h4 className="list-title">What Makes Us Different</h4>
            <ul className="custom-list">
              <li><FaCheckCircle className="list-icon" /> Experienced Development Team</li>
              <li><FaCheckCircle className="list-icon" /> Modern Technologies</li>
              <li><FaCheckCircle className="list-icon" /> Scalable Architecture</li>
              <li><FaCheckCircle className="list-icon" /> Fast Project Delivery</li>
              <li><FaCheckCircle className="list-icon" /> Secure Development Process</li>
              <li><FaCheckCircle className="list-icon" /> Ongoing Technical Support</li>
              <li><FaCheckCircle className="list-icon" /> Transparent Communication</li>
              <li><FaCheckCircle className="list-icon" /> Affordable Pricing</li>
            </ul>
          </section>
        </div>

        {/* Impact & Commitment */}
        <div className="split-grid">
          <section className="content-section card-style" data-aos="fade-up" data-aos-delay="100">
            <div className="section-header">
              <h2><FaChartLine className="emoji-icon" /> Our Impact</h2>
            </div>
            <p>We measure success by the results we deliver.</p>
            <ul className="custom-list">
              <li><FaCheckCircle className="list-icon" /> Successfully delivered software solutions</li>
              <li><FaCheckCircle className="list-icon" /> Long-term client partnerships</li>
              <li><FaCheckCircle className="list-icon" /> High client satisfaction</li>
              <li><FaCheckCircle className="list-icon" /> Modern technology stack</li>
              <li><FaCheckCircle className="list-icon" /> Continuous innovation</li>
              <li><FaCheckCircle className="list-icon" /> Reliable support after project delivery</li>
            </ul>
          </section>

          <section className="content-section card-style highlight-card" data-aos="fade-up" data-aos-delay="200">
            <div className="section-header">
              <h2><FaHandshake className="emoji-icon" /> Our Commitment</h2>
            </div>
            <p>We are committed to delivering software that not only meets today's requirements but is also prepared for tomorrow's challenges.</p>
            <p>Every project is developed with precision, security, performance, and long-term scalability in mind.</p>
            <p>Our goal is not just to complete projects—we aim to build lasting relationships based on trust, quality, and continuous innovation.</p>
          </section>
        </div>

      </div>
    </div>
  )
}

export default AboutPage
