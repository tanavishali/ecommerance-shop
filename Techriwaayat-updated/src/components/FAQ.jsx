import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './FAQ.css';

const faqs = [
  {
    question: "What services does Tech Riwaayat offer?",
    answer: "We specialize in custom software development, mobile and web application development, UI/UX design, cloud architecture, and AI integrations tailored to your business needs."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary depending on complexity and scope. A standard web application might take 4-8 weeks, while complex enterprise software can take several months. We provide a detailed timeline during the discovery phase."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, absolutely. We offer 24/7 post-launch support and maintenance packages to ensure your software remains secure, up-to-date, and performs flawlessly after launch."
  },
  {
    question: "What makes Tech Riwaayat different from other agencies?",
    answer: "Our unwavering commitment to excellence and transparent communication sets us apart. We don't just build software; we build scalable digital solutions aimed at driving tangible business growth."
  },
  {
    question: "How do we get started?",
    answer: "Simply click on the 'Schedule a Call' or 'Start a Project' button. We'll set up an initial consultation to understand your requirements, after which we will provide a comprehensive proposal."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq" data-aos="fade-up">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-label">HAVE QUESTIONS?</span>
          <h2 className="faq-title">
            Frequently Asked <span className="highlight">Questions</span>
          </h2>
          <p className="faq-description">
            Everything you need to know about our services, process, and how we work with our clients globally.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <div className="faq-icon-wrapper">
                  <FaChevronDown className="faq-icon" />
                </div>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
