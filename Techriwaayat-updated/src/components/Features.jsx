import { FaCheckCircle, FaUsers, FaRocket, FaClock } from 'react-icons/fa'
import './Features.css'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: FaCheckCircle,
      title: 'Quality Assured',
      description: 'Every project goes through rigorous testing and quality checks'
    },
    {
      id: 2,
      icon: FaUsers,
      title: 'Expert Team',
      description: 'Dedicated professionals with years of industry experience'
    },
    {
      id: 3,
      icon: FaRocket,
      title: 'Fast Delivery',
      description: 'On-time project completion with zero compromises'
    },
    {
      id: 4,
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock support for all your needs'
    }
  ]

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Tech Riwayaat</h2>
          <p className="features-subtitle">
            We deliver exceptional digital solutions with proven expertise and dedication
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">
                  <IconComponent />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
