import React from 'react';
import { FaHeartbeat, FaShoppingCart, FaGraduationCap, FaPiggyBank, FaPlane, FaBuilding } from 'react-icons/fa';
import './Industries.css';

const Industries = () => {
  const industriesData = [
    { id: 1, icon: <FaHeartbeat />, name: "Healthcare & Tech" },
    { id: 2, icon: <FaShoppingCart />, name: "E-Commerce & Retail" },
    { id: 3, icon: <FaPiggyBank />, name: "FinTech & Banking" },
    { id: 4, icon: <FaGraduationCap />, name: "EdTech & Learning" },
    { id: 5, icon: <FaBuilding />, name: "Real Estate" },
    { id: 6, icon: <FaPlane />, name: "Travel & Hospitality" },
  ];

  return (
    <section className="industries-section" id="industries">
      <div className="industries-container">
        <div className="section-header text-center" data-aos="fade-up">
          <h2>Industries We <span className="highlight">Empower</span></h2>
          <p className="section-subtitle">Delivering specialized, industry-compliant digital solutions across multiple domains.</p>
        </div>
        
        <div className="industries-grid">
          {industriesData.map((industry, index) => (
            <div className="industry-card" key={industry.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="industry-icon">{industry.icon}</div>
              <h3>{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
