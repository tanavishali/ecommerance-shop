import React, { useEffect, useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import './ContactPage.css'
import AOS from 'aos'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE}/schedule-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you for reaching out! We will get back to you shortly.' });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        const message = Array.isArray(data?.message) ? data.message[0] : data?.message;
        setStatus({ type: 'error', message: message || 'Something went wrong. Please try again later.' });
      }
    } catch (error) {
      console.error('Error submitting schedule-a-call form:', error);
      setStatus({ type: 'error', message: 'Network error. Please make sure you are connected to the internet and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero" data-aos="fade-up">
        <div className="contact-hero-container">
          <span className="contact-badge">GET IN TOUCH</span>
          <h1 className="contact-main-title">Let's <span className="highlight">Talk</span></h1>
          <p className="contact-hero-desc">
            Ready to transform your ideas into reality? Schedule a call with our experts today. We are here to answer your questions and discuss how we can help your business thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="cp-content">
        <div className="cp-container">
          
          {/* Left Column: Contact Info */}
          <div className="cp-info-col" data-aos="fade-right">
            <h2>Contact Information</h2>
            <p className="cp-info-subtext">Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="cp-info-cards">
              <div className="cp-info-card">
                <div className="cp-info-icon-wrapper">
                  <FaEnvelope />
                </div>
                <div className="cp-info-details">
                  <h3>Email Us</h3>
                  <p>TeamTechRiwaayat@gmail.com</p>
                </div>
              </div>
              
              <div className="cp-info-card">
                <div className="cp-info-icon-wrapper">
                  <FaPhoneAlt />
                </div>
                <div className="cp-info-details">
                  <h3>Call Us</h3>
                  <p>+92 3263 555252</p>
                </div>
              </div>
              
              <div className="cp-info-card">
                <div className="cp-info-icon-wrapper">
                  <FaMapMarkerAlt />
                </div>
                <div className="cp-info-details">
                  <h3>Visit Us</h3>
                  <p>Lahore, Punjab, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="cp-working-hours">
              <h3>Working Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM (PKT)</p>
              <p>Available 24/7 for urgent technical support.</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="cp-form-col" data-aos="fade-left">
            <div className="cp-form-wrapper">
              <h2>Schedule a Call</h2>
              <form onSubmit={handleSubmit} className="cp-contact-form">
                {status.message && (
                  <div className={`form-status ${status.type}`} style={{
                    padding: '12px 16px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    backgroundColor: status.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: status.type === 'success' ? '#065f46' : '#991b1b',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}>
                    {status.message}
                  </div>
                )}

                <div className="cp-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="cp-form-row">
                  <div className="cp-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="cp-form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="cp-form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="cp-form-select"
                  >
                    <option value="" disabled>Select a Service</option>
                    <option value="Web Design & Development">Web Design & Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="E-Commerce Development">E-Commerce Development</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="WordPress & Plugins">WordPress & Plugins</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="cp-form-group">
                  <label htmlFor="message">How can we help you?</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Tell us about your project, goals, and timeline..." 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="cp-submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <FaPaperPlane className="cp-btn-icon" />}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default ContactPage
