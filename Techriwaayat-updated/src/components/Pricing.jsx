import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import './Pricing.css'

// 👉 Prices/features placeholder hain, jaisa chaho waisa edit kar lena
const plans = [
  {
    id: 1,
    name: 'Starter',
    price: '$299',
    period: '/ project',
    desc: 'Perfect for small businesses getting started online.',
    features: [
      'Responsive Website (up to 5 pages)',
      'Basic SEO Setup',
      'Contact Form Integration',
      '1 Month Free Support',
      'Delivery in 2 Weeks'
    ],
    highlighted: false
  },
  {
    id: 2,
    name: 'Professional',
    price: '$799',
    period: '/ project',
    desc: 'Best for growing businesses that need more features.',
    features: [
      'Everything in Starter',
      'Custom Web App / E-commerce',
      'Advanced SEO Optimization',
      'CMS / Admin Panel',
      '3 Months Free Support',
      'Priority Delivery'
    ],
    highlighted: true
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    desc: 'For large-scale projects with custom requirements.',
    features: [
      'Everything in Professional',
      'AI Automation & Integrations',
      'Dedicated Project Manager',
      'Scalable Architecture',
      '24/7 Priority Support',
      'Ongoing Maintenance Plan'
    ],
    highlighted: false
  }
]

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header" data-aos="fade-up">
          <span className="pricing-label">PRICING PLANS</span>
          <h2 className="pricing-title">
            Simple, Transparent <span className="highlight">Pricing</span>
          </h2>
          <p className="pricing-desc">
            Choose a package that fits your business needs. Need something custom? Let's talk.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              className={`pricing-card ${plan.highlighted ? 'pricing-card-highlight' : ''}`}
              key={plan.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.highlighted && <span className="pricing-badge">Most Popular</span>}

              <h3 className="pricing-plan-name">{plan.name}</h3>
              <p className="pricing-plan-desc">{plan.desc}</p>

              <div className="pricing-price-row">
                <span className="pricing-price">{plan.price}</span>
                <span className="pricing-period">{plan.period}</span>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <FaCheck className="pricing-check" /> {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`pricing-btn ${plan.highlighted ? 'pricing-btn-highlight' : ''}`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
