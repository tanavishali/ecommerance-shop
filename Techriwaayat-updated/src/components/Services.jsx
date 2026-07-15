import { Link } from 'react-router-dom'
import { FaLaptopCode, FaMobileAlt, FaShoppingCart, FaRobot, FaCogs, FaSearch, FaWordpress, FaExternalLinkAlt } from 'react-icons/fa'
import './Services.css'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Web Design & Development',
      description: 'Modern, high-performance websites using React, Next.js, and TypeScript.',
      icon: FaLaptopCode,
      features: ['React & Next.js', 'Responsive Design', 'SEO Optimization'],
      label: 'WEB DEV',
      link: '/services/web-development'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'iOS & Android applications from concept to app store publishing.',
      icon: FaMobileAlt,
      features: ['iOS & Android', 'App Store Publishing', 'Push Notifications'],
      label: 'MOBILE APPS',
      link: '/services/mobile-app-development'
    },
    {
      id: 3,
      title: 'E-Commerce Development',
      description: 'Complete e-commerce solutions with payment integration and dashboards.',
      icon: FaShoppingCart,
      features: ['Payment Integration', 'Inventory Management', 'Admin Dashboard'],
      label: 'E-COMMERCE',
      link: '/services/e-commerce-development'
    },
    {
      id: 4,
      title: 'AI & Automation',
      description: 'Smart automation solutions and AI-powered features for your applications.',
      icon: FaRobot,
      features: ['AI Integration', 'Process Automation', 'ML Models'],
      label: 'AGENTIC AI',
      link: '/services/ai-automation'
    },
    {
      id: 5,
      title: 'Custom Software',
      description: 'Tailored software solutions built to solve your specific business challenges.',
      icon: FaCogs,
      features: ['Custom Solutions', 'Enterprise Grade', 'Scalable Architecture'],
      label: 'CUSTOM SOFTWARE',
      link: '/services/custom-software'
    },
    {
      id: 6,
      title: 'SEO Optimization',
      description: 'Technical SEO, on-page optimization, and content strategies for visibility.',
      icon: FaSearch,
      features: ['Technical SEO', 'On-Page Optimization', 'Analytics'],
      label: 'SEO',
      link: '/services/seo-optimization'
    },
    {
      id: 7,
      title: 'WordPress & Plugins',
      description: 'Custom WordPress development, theme design, and plugin creation.',
      icon: FaWordpress,
      features: ['Custom Themes', 'Plugin Development', 'WooCommerce'],
      label: 'WORDPRESS',
      link: '/services/wordpress-development'
    }
  ]

  return (
    <section id="services" className="services-white" data-aos="fade-up">
      <div className="services-white-container">
        <div className="services-white-header centered-header">
          <span className="services-white-label">OUR SERVICES</span>
          <h2 className="services-white-title">WHAT WE <span className="highlight">BUILD</span></h2>
          <p className="services-white-subtitle">
            Comprehensive digital solutions tailored to your unique business needs.
          </p>
        </div>

        <div className="services-white-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div 
                key={service.id} 
                className="service-white-card" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="white-card-top">
                  <div className="white-service-icon">
                    <IconComponent />
                  </div>
                  <span className="white-service-label">{service.label}</span>
                </div>

                <h3 className="white-service-title">{service.title}</h3>
                <p className="white-service-description">{service.description}</p>

                <div className="white-service-features">
                  {service.features.map((feature, index) => (
                    <div key={index} className="white-feature-item">
                      <span className="white-checkmark">✓</span>
                      <span className="white-feature-text">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={service.link} className="service-card-link">
                  Learn More <FaExternalLinkAlt className="link-icon" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
