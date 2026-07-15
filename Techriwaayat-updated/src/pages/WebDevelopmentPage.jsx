import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLaptopCode, FaCheckCircle, FaCode, FaPaintBrush, FaServer, 
  FaSearchDollar, FaMobileAlt, FaRocket, FaShieldAlt, FaComments, 
  FaReact, FaNode, FaHtml5, FaCss3Alt, FaDatabase, FaStar, FaPlus, FaMinus 
} from 'react-icons/fa'
import { SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiPython, SiJavascript, SiTailwindcss, SiTypescript, SiMongodb } from 'react-icons/si'
import './ServicesShared.css'
import AOS from 'aos'

const WebDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "How long does it take to build a website?", a: "The timeline depends on the complexity of the project. A standard business website takes 2-4 weeks, while a custom web application or e-commerce platform may take 2-3 months." },
    { q: "Will my website be mobile-friendly?", a: "Yes, absolutely! Every website we design is fully responsive and optimized for mobile devices, tablets, and desktop screens." },
    { q: "Do you provide ongoing maintenance?", a: "Yes, we offer post-launch support and maintenance packages to ensure your website stays updated, secure, and performs at its best." },
    { q: "Can you redesign my existing website?", a: "Certainly! We can audit your current website and completely revamp its design, performance, and user experience while preserving your SEO rankings." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaLaptopCode className="badge-icon" /> WEB DESIGN & DEVELOPMENT</span>
          <h1 className="service-main-title">Crafting Digital <span className="highlight">Experiences</span> That Convert</h1>
          <p className="service-hero-description">We build fast, secure, and visually stunning websites tailored to your business needs. From landing pages to complex web applications, we bring your vision to life.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Start Your Project</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2>Transforming Ideas into <span className="highlight">Digital Reality</span></h2>
            <p className="mt-4">In today's digital landscape, your website is often the first interaction a customer has with your brand. A slow, outdated, or confusing website can cost you valuable leads. We specialize in creating high-performance, SEO-optimized, and conversion-focused websites that not only look beautiful but also deliver measurable business results.</p>
          </div>
        </div>
      </section>

      {/* 3. What We Offer */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>What We Offer</h2>
            <p className="section-subtitle">Comprehensive web solutions to elevate your online presence.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <FaPaintBrush className="offer-icon" />
              <h3>UI/UX Design</h3>
              <p>User-centric, engaging, and intuitive designs that keep your visitors hooked and drive conversions.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <FaCode className="offer-icon" />
              <h3>Custom Web Development</h3>
              <p>Tailor-made web applications built from scratch using modern frameworks for ultimate flexibility.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaSearchDollar className="offer-icon" />
              <h3>E-Commerce Solutions</h3>
              <p>Secure, scalable, and feature-rich online stores designed to maximize your sales and streamline inventory.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaServer className="offer-icon" />
              <h3>Backend & API</h3>
              <p>Robust server-side architecture and seamless API integrations to power your web applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Frontend Excellence */}
      <section className="frontend-mastery section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Frontend <span className="highlight">Excellence</span></h2>
            <p className="section-subtitle text-center">Creating pixel-perfect, highly interactive user interfaces.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>The Face of Your Brand</h3>
              <p>Your frontend is where your customers interact with your business. We don't just build websites; we engineer blazing-fast, accessible, and responsive web applications that provide a seamless experience across all devices.</p>
              
              <h3 className="mt-4">Our Frontend Capabilities:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Modern Frameworks:</strong> Expertise in React.js, Next.js, and Vue.js for building dynamic Single Page Applications (SPAs).</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Responsive Design:</strong> Mobile-first architecture ensuring your site looks stunning on phones, tablets, and massive desktop monitors.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Micro-Interactions:</strong> Engaging CSS and JS animations (like AOS and Framer Motion) that delight users without sacrificing load speed.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Web Accessibility (a11y):</strong> Adhering to WCAG standards so your website is usable by everyone, preventing legal liabilities and expanding your audience.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Core Web Vitals Optimization:</strong> Strictly optimizing LCP, FID, and CLS scores to ensure Google ranks your site favorably.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" alt="Frontend Development" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Backend Architecture */}
      <section className="backend-architecture section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Robust <span className="highlight">Backend</span> Architecture</h2>
            <p className="section-subtitle text-center">The powerhouse driving your digital product's functionality and security.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>Scalable & Secure Systems</h3>
              <p>While the frontend is about looks and interaction, the backend is the brain. We design scalable server architectures, secure databases, and efficient APIs that ensure your application never crashes, even under massive traffic spikes.</p>
              
              <h3 className="mt-4">Our Backend Strengths:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Custom API Development:</strong> RESTful and GraphQL APIs that allow your web app, mobile app, and third-party services to communicate flawlessly.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Database Management:</strong> Designing optimized schemas in PostgreSQL, MySQL, and MongoDB for lightning-fast data retrieval.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Cloud Infrastructure:</strong> Deployment and scaling using AWS, Google Cloud, and Docker for high availability and zero downtime.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Enterprise-Grade Security:</strong> Implementing JWT authentication, OAuth, rate limiting, and data encryption to protect user data from cyber threats.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Third-Party Integrations:</strong> Seamlessly connecting payment gateways (Stripe, PayPal), CRM systems (Salesforce, HubSpot), and marketing automation tools.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop" alt="Backend Development" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="why-choose-us section-padding">
        <div className="container">
          <div className="split-layout align-center">
            <div className="split-text" data-aos="fade-right">
              <h2>Why Choose Us?</h2>
              <p>We don't just write code; we build digital assets that grow your business. Our approach combines technical excellence with strategic business thinking.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>Performance First:</strong> Lightning-fast load times.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>SEO Optimized:</strong> Built to rank high on search engines.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Scalable Architecture:</strong> Ready to grow with your business.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Uncompromising Security:</strong> Protecting your data against threats.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="code-window">
                <div className="window-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-body">
                  <code>
                    <span className="keyword">const</span> <span className="variable">success</span> = <span className="keyword">new</span> <span className="class">WebProject</span>({'{'}<br/>
                    &nbsp;&nbsp;quality: <span className="string">'Premium'</span>,<br/>
                    &nbsp;&nbsp;performance: <span className="string">'100%'</span>,<br/>
                    &nbsp;&nbsp;design: <span className="string">'Stunning'</span><br/>
                    {'}'});<br/>
                    <span className="variable">success</span>.<span className="method">launch</span>();
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Development Process */}
      <section className="dev-process section-padding bg-dark text-white">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-white">Our Development Process</h2>
            <p className="section-subtitle text-light-gray">A transparent, agile workflow ensuring quality at every step.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Discovery</h3>
              <p>Understanding your goals, target audience, and project requirements.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>Design</h3>
              <p>Creating wireframes and beautiful UI/UX mockups for your approval.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>Development</h3>
              <p>Writing clean, efficient code to bring the designs to life.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>Testing</h3>
              <p>Rigorous QA testing across multiple devices and browsers.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Launch</h3>
              <p>Deploying your website to the live server and ensuring smooth operation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Technologies We Master</h2>
            <p className="section-subtitle">We use the latest and most reliable tech stacks to build future-proof solutions.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><FaReact className="tech-icon react"/><span>React.js</span></div>
            <div className="tech-item"><FaNode className="tech-icon node" style={{fontSize: '80px', margin: '-10px 0'}}/><span>Node.js</span></div>
            <div className="tech-item"><SiJavascript className="tech-icon js"/><span>JavaScript</span></div>
            <div className="tech-item"><SiTypescript className="tech-icon ts"/><span>TypeScript</span></div>
            <div className="tech-item"><FaHtml5 className="tech-icon html"/><span>HTML5</span></div>
            <div className="tech-item"><FaCss3Alt className="tech-icon css"/><span>CSS3</span></div>
            <div className="tech-item"><SiTailwindcss className="tech-icon tailwind"/><span>Tailwind</span></div>
            <div className="tech-item"><SiMongodb className="tech-icon mongo"/><span>MongoDB</span></div>
            <div className="tech-item"><FaDatabase className="tech-icon sql"/><span>SQL</span></div>
          </div>
        </div>
      </section>

      {/* 7. Website Types */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Types of Websites We Build</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <h3>Corporate Websites</h3>
              <p>Professional, brand-centric sites that establish trust and authority in your industry.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <h3>E-Commerce Platforms</h3>
              <p>High-converting online stores with secure payment gateways and inventory management.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Web Applications</h3>
              <p>Complex, interactive applications (SaaS, Portals, Dashboards) built to solve specific problems.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <h3>Landing Pages</h3>
              <p>Highly optimized, single-page sites designed strictly for lead generation and marketing campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Benefits */}
      <section className="benefits section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Benefits of a Premium Website</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaRocket className="benefit-icon" />
              <div>
                <h4>Increased Credibility</h4>
                <p>A modern website acts as a 24/7 salesperson, instantly boosting your brand's trust factor.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaMobileAlt className="benefit-icon" />
              <div>
                <h4>Better User Engagement</h4>
                <p>Intuitive navigation keeps visitors on your site longer, reducing bounce rates.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaSearchDollar className="benefit-icon" />
              <div>
                <h4>Higher Conversion Rates</h4>
                <p>Strategic CTAs and frictionless user journeys turn passive visitors into paying customers.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaShieldAlt className="benefit-icon" />
              <div>
                <h4>Competitive Advantage</h4>
                <p>Stand out in a crowded market with a unique digital presence that outshines your competitors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="service-faq section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-container" style={{maxWidth: '800px', margin: '0 auto'}}>
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

      {/* 10. Call To Action */}
      <section className="service-bottom-cta">
        <div className="container text-center" data-aos="zoom-in">
          <div className="service-cta-box">
            <h2 className="text-white">Ready to Take Your Business to the Next Level?</h2>
            <p className="text-light-gray mt-3">Let's build a website that drives growth and sets you apart from the competition.</p>
            <div className="cta-buttons mt-4">
              <Link to="/contact" className="btn btn-primary cta-btn">Discuss Your Project <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default WebDevelopmentPage
