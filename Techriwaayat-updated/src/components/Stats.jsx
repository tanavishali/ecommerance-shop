import React from 'react';
import { FaCode, FaSmile, FaProjectDiagram, FaGlobe } from 'react-icons/fa';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { id: 1, icon: <FaProjectDiagram />, count: "120+", title: "Projects Completed" },
    { id: 2, icon: <FaSmile />, count: "98%", title: "Client Satisfaction" },
    { id: 3, icon: <FaCode />, count: "500k+", title: "Lines of Code" },
    { id: 4, icon: <FaGlobe />, count: "3+", title: "Countries Served" }
  ];

  return (
    <section className="stats-section" id="stats">
      <div className="stats-container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div className="stat-box" key={stat.id} data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <h2 className="stat-number">{stat.count}</h2>
              <p className="stat-label">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
