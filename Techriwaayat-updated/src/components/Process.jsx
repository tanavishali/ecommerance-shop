import { FaLightbulb, FaPencilAlt, FaCode, FaCheckCircle, FaRocket, FaHeadset } from 'react-icons/fa'
import './Process.css'

const Process = () => {
  const steps = [
    {
      id: 1,
      icon: FaLightbulb,
      title: 'Discovery',
      description: 'We understand your vision, goals, and target audience to create a solid foundation.'
    },
    {
      id: 2,
      icon: FaPencilAlt,
      title: 'Strategy & Design',
      description: 'Crafting intuitive designs and technical strategies tailored to your business needs.'
    },
    {
      id: 3,
      icon: FaCode,
      title: 'Development',
      description: 'Building robust, scalable solutions using cutting-edge technologies and best practices.'
    },
    {
      id: 4,
      icon: FaCheckCircle,
      title: 'Testing & QA',
      description: 'Rigorous testing to ensure performance, security, and reliability at every level.'
    },
    {
      id: 5,
      icon: FaRocket,
      title: 'Launch',
      description: 'Seamless deployment with comprehensive monitoring and optimization for success.'
    },
    {
      id: 6,
      icon: FaHeadset,
      title: 'Support',
      description: 'Dedicated support and maintenance to keep your solution running smoothly always.'
    }
  ]

  return (
    <section id="process" className="process-section" data-aos="fade-up">
      <div className="process-container">
        <div className="process-header">
          <span className="process-label">OUR PROCESS</span>
          <h2 className="process-title">HOW WE <span className="highlight">WORK</span></h2>
          <p className="process-subtitle">
            A proven methodology to deliver exceptional results with every project
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={step.id} className="process-card">
                <div className="process-number">{step.id}</div>
                <div className="process-icon-wrapper">
                  <div className="process-icon">
                    <IconComponent />
                  </div>
                </div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-description">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="process-arrow">→</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Process
