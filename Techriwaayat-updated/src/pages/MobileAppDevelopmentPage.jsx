import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaMobileAlt, FaApple, FaAndroid, FaReact, FaCheckCircle, 
  FaRocket, FaShieldAlt, FaComments, FaCode, FaChartLine, 
  FaPlus, FaMinus, FaCogs, FaUsers, FaLock, FaDatabase
} from 'react-icons/fa'
import { SiFlutter, SiSwift, SiKotlin, SiFirebase } from 'react-icons/si'
import './ServicesShared.css'
import './MobileAppDevelopmentPage.css'
import AOS from 'aos'

const MobileAppDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "How long does it take to develop a mobile app?", a: "The timeline depends on the app's complexity, features, and platform requirements. A simple app can take 2-3 months, while complex, feature-rich applications might take 4-6 months or more." },
    { q: "Do you build for both iOS and Android?", a: "Yes, we offer both native app development (specifically for iOS or Android) and cross-platform development (using frameworks like React Native or Flutter to run on both)." },
    { q: "Will you help me publish the app to the App Store and Google Play?", a: "Absolutely. We handle the entire deployment process, ensuring your app meets all guidelines and successfully goes live on both the Apple App Store and Google Play Store." },
    { q: "Who owns the source code once the app is completed?", a: "You do. Once the project is completed and fully paid for, we transfer 100% ownership of the source code and intellectual property to you." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaMobileAlt className="badge-icon" /> MOBILE APP DEVELOPMENT</span>
          <h1 className="service-main-title">Next-Gen <span className="highlight">Mobile Experiences</span> for Your Audience</h1>
          <p className="service-hero-description">We design and develop high-performance, user-centric mobile applications for iOS and Android that drive engagement and accelerate business growth.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Start Your App Project</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2>Empower Your Brand with a <span className="highlight">Mobile-First Approach</span></h2>
            <p className="mt-4">In a world where smartphones dominate digital interaction, a powerful mobile app is no longer a luxury—it's a necessity. We build secure, scalable, and intuitive mobile applications tailored to solve your unique business challenges, providing your users with a seamless and engaging experience right in the palm of their hands.</p>
          </div>
        </div>
      </section>

      {/* 3. Our Mobile App Services */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Our Mobile App Services</h2>
            <p className="section-subtitle">End-to-end mobile development solutions to bring your vision to life.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <FaApple className="offer-icon" />
              <h3>iOS App Development</h3>
              <p>Custom, high-performance native applications designed exclusively for iPhones and iPads using Swift and cutting-edge iOS frameworks.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <FaAndroid className="offer-icon" />
              <h3>Android App Development</h3>
              <p>Scalable and robust native apps optimized for the diverse Android ecosystem, ensuring flawless performance across all devices.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaReact className="offer-icon" />
              <h3>Cross-Platform Apps</h3>
              <p>Cost-effective development using React Native or Flutter, allowing you to launch on both iOS and Android simultaneously with a single codebase.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaCogs className="offer-icon" />
              <h3>App Maintenance</h3>
              <p>Ongoing support, bug tracking, performance optimization, and OS updates to keep your app running smoothly long after launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Native vs Cross-Platform */}
      <section className="native-cross-platform section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2><span className="highlight">Native</span> vs <span className="highlight">Cross-Platform</span></h2>
            <p className="section-subtitle">Choosing the right technology stack for your business goals.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>Tailored to Your Strategy</h3>
              <p>We don't force a single technology on our clients. Instead, we analyze your target audience, budget, and performance requirements to recommend the perfect framework for your mobile application.</p>
              
              <h3 className="mt-4">Our Technical Expertise:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>True Native Performance:</strong> For highly complex apps (like gaming or heavy AR/VR), we use Swift (iOS) and Kotlin (Android) to unlock 100% of the device's hardware capabilities.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>React Native:</strong> Leveraging Meta's powerful framework to build apps that feel truly native while sharing a massive portion of the codebase across both platforms.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Flutter Development:</strong> Using Google's UI toolkit to craft beautiful, natively compiled applications from a single codebase with unparalleled custom animations.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Backend as a Service (BaaS):</strong> Seamlessly integrating Firebase, Supabase, or AWS Amplify for real-time databases, push notifications, and robust user authentication.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop" alt="Native and Cross Platform Mobile App Development" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. End-to-End App Lifecycle */}
      <section className="app-lifecycle section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>The Complete <span className="highlight">App Lifecycle</span></h2>
            <p className="section-subtitle">From a napkin sketch to the top charts on the App Store.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>We Handle Everything</h3>
              <p>Building the app is just one piece of the puzzle. We manage the entire lifecycle of your mobile product, ensuring it not only functions flawlessly but is also successfully adopted by your target market.</p>
              
              <h3 className="mt-4">Our Process:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>UX/UI Design:</strong> Creating intuitive, thumb-friendly interfaces following Apple's Human Interface Guidelines and Google's Material Design.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>API & Cloud Integration:</strong> Building secure custom backends (Node.js/Python) to handle complex business logic and sync data between the app and your web platforms.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Rigorous QA Testing:</strong> Testing across dozens of real physical devices (not just emulators) to ensure no crashes, memory leaks, or battery drain issues.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>App Store Deployment:</strong> Handling the stressful review processes of the Apple App Store and Google Play, ensuring full compliance and successful launch.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop" alt="Mobile App Lifecycle and Publishing" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
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
              <p>We don't just write code; we craft mobile strategies. Our team ensures your app is built for speed, security, and maximum user retention.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>Flawless UI/UX:</strong> Designs that keep users coming back.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Scalable Backend:</strong> Architectures built to handle millions of users.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Agile Delivery:</strong> Rapid prototyping and transparent sprints.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Data Security:</strong> Enterprise-grade encryption and compliance.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="mobile-mockup-window">
                <div className="mockup-header">
                  <div className="mockup-notch"></div>
                </div>
                <div className="mockup-body">
                  <code>
                    <span className="keyword">import</span> {'{'} <span className="class">Innovation</span> {'}'} <span className="keyword">from</span> <span className="string">'tech-riwaayat'</span>;<br/><br/>
                    <span className="keyword">const</span> <span className="variable">MobileApp</span> = () =&gt; {'{'}<br/>
                    &nbsp;&nbsp;<span className="keyword">return</span> (<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="class">Innovation</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="variable">speed</span>=<span className="string">"blazing"</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="variable">ui</span>=<span className="string">"stunning"</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br/>
                    &nbsp;&nbsp;);<br/>
                    {'}'};<br/><br/>
                    <span className="keyword">export default</span> <span className="variable">MobileApp</span>;
                  </code>
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
            <h2 className="text-white">Our Development Process</h2>
            <p className="section-subtitle text-light-gray">From concept to app store, a proven methodology for success.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Strategy</h3>
              <p>Market research, competitor analysis, and defining the app's core value proposition.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>UI/UX Design</h3>
              <p>Creating intuitive wireframes and interactive prototypes for seamless navigation.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>Development</h3>
              <p>Writing clean, efficient frontend and backend code with rigorous version control.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>QA & Testing</h3>
              <p>Comprehensive testing across real devices for performance, security, and usability.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Launch</h3>
              <p>Deploying to App Store & Google Play, followed by monitoring and post-launch support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Technologies We Master</h2>
            <p className="section-subtitle">We leverage industry-leading tools to build powerful mobile applications.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><FaReact className="tech-icon react"/><span>React Native</span></div>
            <div className="tech-item"><SiFlutter className="tech-icon flutter"/><span>Flutter</span></div>
            <div className="tech-item"><SiSwift className="tech-icon swift"/><span>Swift</span></div>
            <div className="tech-item"><SiKotlin className="tech-icon kotlin"/><span>Kotlin</span></div>
            <div className="tech-item"><FaApple className="tech-icon ios"/><span>iOS SDK</span></div>
            <div className="tech-item"><FaAndroid className="tech-icon android"/><span>Android SDK</span></div>
            <div className="tech-item"><SiFirebase className="tech-icon firebase"/><span>Firebase</span></div>
            <div className="tech-item"><FaDatabase className="tech-icon sql"/><span>SQLite/Room</span></div>
          </div>
        </div>
      </section>

      {/* 7. Types of Apps We Build */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Types of Apps We Build</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <h3>On-Demand Services</h3>
              <p>Apps for ride-sharing, food delivery, and home services with real-time tracking.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <h3>M-Commerce</h3>
              <p>Mobile shopping apps featuring seamless checkout, AR try-ons, and secure payments.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <h3>FinTech Solutions</h3>
              <p>Highly secure banking apps, digital wallets, and investment management platforms.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <h3>Healthcare & Fitness</h3>
              <p>Telemedicine portals, workout trackers, and wellness applications with IoT integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Benefits */}
      <section className="benefits section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Benefits of Investing in a Mobile App</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaUsers className="benefit-icon" />
              <div>
                <h4>Direct Customer Channel</h4>
                <p>Stay in your customers' pockets. Use push notifications to instantly engage your audience.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaChartLine className="benefit-icon" />
              <div>
                <h4>Increased Brand Value</h4>
                <p>A beautifully designed app elevates your brand's prestige and creates lasting loyalty.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaRocket className="benefit-icon" />
              <div>
                <h4>Boosted Sales & ROI</h4>
                <p>Frictionless mobile experiences lead to higher conversion rates compared to mobile websites.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaLock className="benefit-icon" />
              <div>
                <h4>Personalized Experience</h4>
                <p>Leverage device features like GPS and camera to offer uniquely tailored user experiences.</p>
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

      {/* 10. Call To Action */}
      <section className="service-bottom-cta">
        <div className="container text-center" data-aos="zoom-in">
          <div className="service-cta-box">
            <h2 className="text-white">Ready to Turn Your App Idea into Reality?</h2>
            <p className="text-light-gray mt-3">Let's build a mobile application that your users will love.</p>
            <div className="cta-buttons mt-4">
              <Link to="/contact" className="btn btn-primary cta-btn">Discuss Your App Idea <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default MobileAppDevelopmentPage
