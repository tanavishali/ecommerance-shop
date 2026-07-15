import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // In production, point this to your actual PHP script URL if it's on a different origin
      // Example: 'https://techriwaayat.com/backend/contact.php'
      const response = await fetch('/backend/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We will check it and reply shortly.' });
        setFormData({ name: '', email: '', service: '', subject: '', message: '' }); // clear form
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again later.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback for local development when PHP is not running
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setStatus({ type: 'success', message: 'Local Test Success! (Note: Actual emails will only send on live server)' });
        setFormData({ name: '', email: '', service: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Network error. Please make sure you are connected to the internet and try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        <div className="contact-header">
          <span className="contact-label">GET IN TOUCH</span>
          <h2 className="contact-title">
            Let's <span className="highlight">Connect</span>
          </h2>
          <p className="contact-description">
            Have a project in mind or just want to say hi? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info (Left) */}
          <div className="contact-info" data-aos="fade-right">
            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaEnvelope className="info-icon" />
              </div>
                <div className="info-details">
                  <h3>Email Us</h3>
                  <p>TeamTechRiwaayat@gmail.com</p>
                </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaPhoneAlt className="info-icon" />
              </div>
                <div className="info-details">
                  <h3>Call Us</h3>
                  <p>+92 3263 555252</p>
                  <p>Mon-Fri, 9am-6pm</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaMapMarkerAlt className="info-icon" />
              </div>
                <div className="info-details">
                  <h3>Visit Us</h3>
                  <p>Lahore</p>
                  <p>Punjab, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="contact-form-wrapper" data-aos="fade-left">
            <form className="contact-form" onSubmit={handleSubmit}>
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
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  required 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="form-input form-select"
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
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                  required 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message" 
                  rows="5" 
                  required 
                  className="form-input form-textarea"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting} style={{opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer'}}>
                {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <FaPaperPlane className="submit-icon" />}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
