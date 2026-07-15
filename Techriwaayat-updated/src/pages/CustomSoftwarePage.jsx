import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLaptopCode, FaCogs, FaCheckCircle, FaNetworkWired, 
  FaServer, FaShieldAlt, FaRocket, FaMinus, FaPlus, 
  FaComments, FaBuilding, FaDatabase, FaChartPie, FaCodeBranch, FaAws, FaCode
} from 'react-icons/fa'
import { SiPython, SiDocker, SiReact, SiSpringboot } from 'react-icons/si'
import './ServicesShared.css'
import './CustomSoftwarePage.css'
import AOS from 'aos'

const CustomSoftwarePage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "Why should we choose custom software over off-the-shelf solutions?", a: "Off-the-shelf software forces you to adapt your business processes to their limitations. Custom software is built exactly for your workflows, giving you a massive competitive advantage, zero recurring license fees per user, and full ownership of the intellectual property." },
    { q: "How do you ensure the software scales as our business grows?", a: "We build using modern Microservices architectures and cloud-native infrastructure (like AWS and Docker), ensuring your system can handle increasing traffic and data loads without performance degradation." },
    { q: "Who owns the source code?", a: "You do. Upon project completion and final payment, we transfer 100% of the IP rights and source code to your company. There are no vendor lock-ins." },
    { q: "Do you provide maintenance and support after launch?", a: "Yes! We offer flexible SLA-backed maintenance packages to ensure your software stays updated, secure, and fully operational 24/7." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaLaptopCode className="badge-icon" /> CUSTOM SOFTWARE</span>
          <h1 className="service-main-title">Tailor-Made <span className="highlight">Software Solutions</span> for Complex Problems</h1>
          <p className="service-hero-description">We engineer scalable, secure, and high-performance bespoke software that aligns perfectly with your business goals, replacing inefficient workflows with digital excellence.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Discuss Your Project</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2 className="text-center">Stop Adapting. Start <span className="highlight">Innovating.</span></h2>
            <p className="mt-4 text-center">Generic software limits your potential. We partner with enterprises to architect robust, enterprise-grade applications from the ground up. Whether you need a proprietary CRM, an automated ERP, or a complex data-processing engine, our engineering team turns your operational bottlenecks into streamlined digital assets.</p>
          </div>
        </div>
      </section>

      {/* 3. Our Custom Software Services */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Our Custom Software Services</h2>
            <p className="section-subtitle text-center">Full-cycle development from idea to enterprise deployment.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <FaBuilding className="offer-icon" />
              <h3>Enterprise ERP Systems</h3>
              <p>Centralize your business operations with a custom Enterprise Resource Planning system tailored exactly to how your company functions.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <FaChartPie className="offer-icon" />
              <h3>Custom CRM Platforms</h3>
              <p>Manage customer relationships, sales pipelines, and support tickets with a CRM built specifically for your sales cycle.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaNetworkWired className="offer-icon" />
              <h3>SaaS Product Development</h3>
              <p>Turn your unique idea into a scalable Software-as-a-Service product with multi-tenant architecture and subscription billing.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaCodeBranch className="offer-icon" />
              <h3>API & Integrations</h3>
              <p>Connect disparate systems seamlessly. We build robust APIs to ensure your different software tools communicate flawlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Agile Engineering Process */}
      <section className="engineering-process section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Our Agile <span className="highlight">Engineering Process</span></h2>
            <p className="section-subtitle text-center">A transparent, iterative approach that guarantees delivery on time and within budget.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>From Concept to Code</h3>
              <p>Building custom software is a complex journey. We eliminate the risk by utilizing a strict Agile methodology. You are involved at every step, with continuous deployments allowing you to test features as they are built, rather than waiting months for a final reveal.</p>
              
              <h3 className="mt-4">How We Build:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Discovery & Scoping:</strong> Deep-dive workshops to understand your business logic, user personas, and technical requirements.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>UI/UX Prototyping:</strong> Creating high-fidelity, clickable Figma prototypes so you can "feel" the software before a single line of code is written.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Sprint-Based Development:</strong> Breaking the project into 2-week sprints with clear deliverables and continuous feedback loops.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Automated QA Testing:</strong> Implementing Unit, Integration, and End-to-End (E2E) testing pipelines to guarantee bug-free releases.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Seamless Deployment:</strong> Zero-downtime CI/CD pipelines deploying your application securely to production.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" alt="Agile Engineering Team" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Enterprise Architecture */}
      <section className="enterprise-architecture section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Scalable <span className="highlight">Enterprise Architecture</span></h2>
            <p className="section-subtitle text-center">Built to handle millions of transactions without breaking a sweat.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>Future-Proof Technology Stack</h3>
              <p>We don't rely on outdated monolithic architectures. We build distributed systems using Microservices, Serverless computing, and Cloud-native infrastructure. This ensures that as your business scales from 100 to 100,000 daily active users, your software scales automatically.</p>
              
              <h3 className="mt-4">Our Technical Arsenal:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Cloud Infrastructure:</strong> AWS (Amazon Web Services), Google Cloud Platform (GCP), and Microsoft Azure for high-availability hosting.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Containerization:</strong> Docker and Kubernetes for isolating services, ensuring consistent environments, and auto-scaling under load.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Modern Runtimes:</strong> Node.js, Python (Django/FastAPI), and Java (Spring Boot) for lightning-fast backend processing.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Data Persistence:</strong> Strategic use of PostgreSQL for relational data, MongoDB for unstructured data, and Redis for ultra-fast caching.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Event-Driven Systems:</strong> Utilizing Kafka and RabbitMQ to process massive streams of real-time data efficiently.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" alt="Enterprise Server Architecture" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="why-choose-us section-padding">
        <div className="container">
          <div className="split-layout">
            <div className="split-text" data-aos="fade-right">
              <h2>Why Choose Us?</h2>
              <p>We combine deep technical expertise with agile methodologies to deliver software that is reliable, scalable, and easy to maintain.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>Clean Code:</strong> Following SOLID principles and rigorous code reviews.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Agile Delivery:</strong> Transparent sprints and regular milestone demos.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Scalable Architecture:</strong> Cloud-native structures designed for growth.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>IP Ownership:</strong> You retain full rights to the source code.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="software-mockup">
                <div className="sm-sidebar">
                  <div className="sm-logo"></div>
                  <div className="sm-nav-item active"></div>
                  <div className="sm-nav-item"></div>
                  <div className="sm-nav-item"></div>
                  <div className="sm-nav-item"></div>
                </div>
                <div className="sm-main">
                  <div className="sm-header">
                    <div className="sm-search"></div>
                    <div className="sm-profile"></div>
                  </div>
                  <div className="sm-content">
                    <div className="sm-cards">
                      <div className="sm-card"></div>
                      <div className="sm-card"></div>
                      <div className="sm-card"></div>
                    </div>
                    <div className="sm-chart">
                      <div className="sm-bar" style={{height: '40%'}}></div>
                      <div className="sm-bar" style={{height: '70%'}}></div>
                      <div className="sm-bar" style={{height: '50%'}}></div>
                      <div className="sm-bar" style={{height: '90%'}}></div>
                      <div className="sm-bar" style={{height: '60%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Development Process */}
      <section className="dev-process section-padding bg-dark">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center text-white">Our Engineering Process</h2>
            <p className="section-subtitle text-center text-light-gray">A systematic approach to building complex software.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Discovery & Scoping</h3>
              <p>Deep-diving into your business logic to create comprehensive technical requirement documents.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>System Architecture</h3>
              <p>Designing the database schema, selecting the tech stack, and mapping API endpoints.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>Agile Development</h3>
              <p>Writing clean, modular code in 2-week sprints with continuous integration.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>Rigorous Testing</h3>
              <p>Unit, integration, and end-to-end testing to ensure a bug-free, secure product.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Deployment & SLA</h3>
              <p>Going live on your servers or the cloud, backed by a Service Level Agreement for support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies We Use */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Enterprise Tech Stack</h2>
            <p className="section-subtitle text-center">Robust, battle-tested technologies for mission-critical applications.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><SiPython className="tech-icon python"/><span>Python</span></div>
            <div className="tech-item"><SiSpringboot className="tech-icon java"/><span>Java/Spring</span></div>
            <div className="tech-item"><FaCode className="tech-icon csharp"/><span>C# / .NET</span></div>
            <div className="tech-item"><SiDocker className="tech-icon docker"/><span>Docker</span></div>
            <div className="tech-item"><SiReact className="tech-icon react"/><span>React</span></div>
            <div className="tech-item"><FaAws className="tech-icon aws"/><span>AWS Cloud</span></div>
          </div>
        </div>
      </section>

      {/* 7. Software Solutions We Build */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Software Solutions We Build</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <h3>FinTech Solutions</h3>
              <p>Secure payment gateways, trading platforms, and ledger systems with bank-grade encryption.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <h3>Healthcare Portals</h3>
              <p>HIPAA-compliant patient management systems, telemedicine apps, and lab result dashboards.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Logistics & Supply Chain</h3>
              <p>Fleet tracking software, warehouse inventory management, and automated route optimization.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <h3>EdTech Platforms</h3>
              <p>Virtual classrooms, learning management systems (LMS), and student grading portals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Key Features */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Key Architectural Features</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaServer className="benefit-icon" />
              <div>
                <h4>Microservices Architecture</h4>
                <p>Decoupled services for higher fault tolerance, easier updates, and independent scaling.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaShieldAlt className="benefit-icon" />
              <div>
                <h4>Enterprise Security</h4>
                <p>Role-Based Access Control (RBAC), end-to-end encryption, and OWASP Top 10 compliance.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaDatabase className="benefit-icon" />
              <div>
                <h4>Data Pipeline Automation</h4>
                <p>Real-time data syncing between databases, external APIs, and reporting tools.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCogs className="benefit-icon" />
              <div>
                <h4>CI/CD Pipelines</h4>
                <p>Automated testing and deployment ensuring zero-downtime updates to production.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Benefits */}
      <section className="benefits section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Why Custom Software Wins</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaLaptopCode className="benefit-icon" />
              <div>
                <h4>Perfect Workflow Fit</h4>
                <p>The software bends to your business logic, eliminating workarounds and manual interventions.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaChartPie className="benefit-icon" />
              <div>
                <h4>No License Fees</h4>
                <p>Stop paying per-seat subscriptions. Once built, the software is yours forever.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaRocket className="benefit-icon" />
              <div>
                <h4>High Valuation</h4>
                <p>Proprietary software adds massive intellectual property value to your company's net worth.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Competitive Advantage</h4>
                <p>Your competitors are using the same generic tools. Custom tech gives you a unique edge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="service-faq section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`} 
                key={index}
                onClick={() => toggleFaq(index)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  <span className="faq-toggle-icon">
                    {activeFaq === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                <div className="faq-answer" style={{padding: activeFaq === index ? '0 20px 20px' : '0 20px', maxHeight: activeFaq === index ? '200px' : '0'}}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Call To Action */}
      <section className="service-bottom-cta">
        <div className="container text-center" data-aos="zoom-in">
          <div className="service-cta-box">
            <h2 className="text-center text-white">Ready to Build Your Proprietary System?</h2>
            <p className="text-light-gray mt-3 text-center">Let's discuss how custom software can transform your business operations.</p>
            <div className="cta-buttons mt-4 text-center">
              <Link to="/contact" className="btn btn-primary cta-btn">Book a Technical Consultation <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default CustomSoftwarePage
