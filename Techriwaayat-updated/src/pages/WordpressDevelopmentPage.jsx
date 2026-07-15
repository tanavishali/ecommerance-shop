import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaWordpress, FaPhp, FaReact, FaHtml5, FaDatabase,
  FaCheckCircle, FaTachometerAlt, FaShieldAlt, FaPuzzlePiece,
  FaShoppingCart, FaCreditCard, FaUserFriends, FaSync,
  FaMinus, FaPlus, FaComments, FaLaptopCode, FaRocket
} from 'react-icons/fa'
import './ServicesShared.css'
import './WordpressDevelopmentPage.css'
import AOS from 'aos'

const WordpressDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "Do you use pre-made templates or build custom themes?", a: "We strictly build custom WordPress themes from scratch. Pre-made templates are often bloated, slow, and insecure. A custom theme ensures blazing fast load times and a design tailored exactly to your brand." },
    { q: "Is WordPress secure for enterprise websites?", a: "Yes, when configured correctly. We implement advanced security protocols including custom login URLs, Wordfence firewalls, two-factor authentication, and secure database structures to make your site bulletproof." },
    { q: "What is Headless WordPress?", a: "Headless WordPress separates the backend (where you manage content) from the frontend (what users see). We use React.js or Next.js for the frontend, resulting in an incredibly fast and secure website while keeping the familiar WP admin dashboard." },
    { q: "Can you fix my slow WordPress website?", a: "Absolutely. We offer comprehensive speed optimization services which include database cleanup, image WebP conversion, asset minification, and advanced caching setups to get you a 90+ score on Google PageSpeed." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaWordpress className="badge-icon" /> WORDPRESS DEVELOPMENT</span>
          <h1 className="service-main-title">High-Performance <span className="highlight">Custom WordPress</span> Solutions</h1>
          <p className="service-hero-description">Move beyond bloated templates. We engineer blazing-fast, secure, and highly scalable custom WordPress websites that empower your content team and convert your visitors.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Start Your WP Project</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2 className="text-center">Mastering the World's Most <span className="highlight">Powerful CMS</span></h2>
            <p className="mt-4 text-center">WordPress powers over 40% of the web, but true digital excellence requires more than just installing a theme. We treat WordPress as a robust application framework. By utilizing Advanced Custom Fields, Custom Post Types, and modern PHP frameworks, we build enterprise-grade platforms that are as powerful on the backend as they are beautiful on the frontend.</p>
          </div>
        </div>
      </section>

      {/* 3. Our WordPress Services */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Our WordPress Services</h2>
            <p className="section-subtitle text-center">Comprehensive solutions from simple blogs to complex portals.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <FaLaptopCode className="offer-icon" />
              <h3>Custom Theme Design</h3>
              <p>Pixel-perfect, from-scratch theme development ensuring zero bloat, high performance, and exact adherence to your UI/UX designs.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <FaPuzzlePiece className="offer-icon" />
              <h3>Plugin Development</h3>
              <p>When off-the-shelf plugins don't cut it, we write custom PHP plugins to add bespoke functionality perfectly suited to your business logic.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaRocket className="offer-icon" />
              <h3>Headless WordPress</h3>
              <p>Decoupling the WP backend and connecting it via REST API or GraphQL to a lightning-fast React or Next.js frontend.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaTachometerAlt className="offer-icon" />
              <h3>Speed Optimization</h3>
              <p>Aggressive performance tuning to pass Core Web Vitals, ensuring instant load times and higher SEO rankings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Custom Theme Development */}
      <section className="custom-theme section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Beyond <span className="highlight">Pre-Made Templates</span></h2>
            <p className="section-subtitle text-center">True brand identity requires custom code, not a $50 theme forest template.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>Tailored to Perfection</h3>
              <p>Most agencies buy bloated, heavy templates, slap your logo on them, and call it a day. This results in slow load times, security vulnerabilities, and a website that looks exactly like your competitors. We do things differently.</p>
              
              <h3 className="mt-4">Our Custom Theme Approach:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Zero Bloat:</strong> We write every line of CSS and PHP from scratch. If a feature isn't needed, its code doesn't exist on your site.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Advanced Custom Fields (ACF):</strong> We build incredibly intuitive backend dashboards so your team can easily update complex layouts without touching code.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Security First:</strong> Without the hundreds of unnecessary third-party plugins that premium themes require, your attack surface area is drastically reduced.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Pixel-Perfect Implementation:</strong> We take your Figma or Adobe XD designs and translate them into a 100% accurate, fully functional WordPress theme.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop" alt="Custom WordPress Theme Development" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Headless WordPress */}
      <section className="headless-wp section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">The Future: <span className="highlight">Headless WordPress</span></h2>
            <p className="section-subtitle text-center">Combining the world's best CMS with the world's fastest frontend frameworks.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>Unmatched Speed and Security</h3>
              <p>Headless architecture decouples the WordPress backend (where you write content) from the frontend (what the user sees). By rendering the frontend using modern JavaScript frameworks like React or Next.js, we deliver enterprise-grade performance.</p>
              
              <h3 className="mt-4">Why Go Headless?</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Omnichannel Delivery:</strong> Publish content once in WordPress and deliver it simultaneously to your website, mobile app, and smartwatch interfaces via REST API or GraphQL.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Lightning Fast:</strong> Next.js generates static pages, resulting in instantaneous page loads that traditional WordPress setups can never match.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Ultimate Security:</strong> Because the frontend is decoupled and static, hackers cannot access your database or execute malicious PHP code through the user interface.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Familiar Content Management:</strong> Your marketing team doesn't have to learn a new system; they keep the WordPress dashboard they already know and love.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" alt="Headless WordPress React Nextjs" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
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
              <p>We do not rely on visual page builders that slow down your site. We write clean, semantic code that Google loves.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>Zero Bloat:</strong> We only load scripts and styles where absolutely necessary.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Security First:</strong> Hardened WP installations immune to common brute-force attacks.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Easy Management:</strong> Custom backend dashboards so you can edit content easily.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Scalability:</strong> Architecture designed to handle massive traffic spikes.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="wp-mockup">
                <div className="wp-sidebar">
                  <div className="wp-logo-sm"><FaWordpress /></div>
                  <div className="wp-menu-item">Dashboard</div>
                  <div className="wp-menu-item">Posts</div>
                  <div className="wp-menu-item">Media</div>
                  <div className="wp-menu-item active">Pages</div>
                  <div className="wp-menu-item">Appearance</div>
                  <div className="wp-menu-item">Plugins</div>
                </div>
                <div className="wp-main">
                  <div className="wp-topbar">
                    <span className="wp-site-name">Your Awesome Site</span>
                    <div className="wp-user">Howdy, Admin</div>
                  </div>
                  <div className="wp-editor-area">
                    <h1 className="wp-page-title">Edit Page</h1>
                    <div className="wp-gutenberg-block">
                      <div className="block-toolbar"></div>
                      <div className="block-content text-placeholder"></div>
                      <div className="block-content text-placeholder short"></div>
                    </div>
                    <div className="wp-gutenberg-block image-block">
                       <FaReact className="wp-react-icon spinning" />
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
            <h2 className="text-center text-white">Our WP Engineering Process</h2>
            <p className="section-subtitle text-center text-light-gray">From wireframe to a living, breathing CMS.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Discovery</h3>
              <p>Mapping out your exact content requirements, taxonomy, and custom post types.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>UI/UX Design</h3>
              <p>Creating high-fidelity Figma designs that align with your brand identity.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>Theme Coding</h3>
              <p>Translating designs into a lightweight, custom WordPress theme using modern PHP/JS.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>QA & Security</h3>
              <p>Testing across all devices, auditing security vulnerabilities, and optimizing speed.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Launch & Train</h3>
              <p>Deploying the site live and providing comprehensive training on how to use your new custom backend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies We Use */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">The Modern WP Stack</h2>
            <p className="section-subtitle text-center">Using industry-standard languages to power your CMS.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><FaWordpress className="tech-icon wp-blue"/><span>WordPress</span></div>
            <div className="tech-item"><FaPhp className="tech-icon php-purple"/><span>PHP 8+</span></div>
            <div className="tech-item"><FaReact className="tech-icon react-blue"/><span>React (Headless)</span></div>
            <div className="tech-item"><FaDatabase className="tech-icon mysql-blue"/><span>MySQL</span></div>
            <div className="tech-item"><FaHtml5 className="tech-icon html-orange"/><span>HTML5 / SCSS</span></div>
          </div>
        </div>
      </section>

      {/* 7. Plugins We Develop */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Custom Plugins We Develop</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <FaPuzzlePiece className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>Custom Gutenberg Blocks</h3>
              <p>Bespoke editor blocks that allow your marketing team to build complex layouts without writing code.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <FaShoppingCart className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>WooCommerce Add-ons</h3>
              <p>Customizing the checkout flow, building complex shipping calculators, and integrating dropshipping APIs.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <FaSync className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>API Sync & Integrations</h3>
              <p>Plugins that automatically sync your WordPress data with Salesforce, HubSpot, or custom external databases.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <FaUserFriends className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>Membership Systems</h3>
              <p>Building complex user portals with tiered access, recurring billing, and protected content areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Features */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Key Development Features</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaLaptopCode className="benefit-icon" />
              <div>
                <h4>Advanced Custom Fields (ACF)</h4>
                <p>We build highly structured data fields so you can update complex pages without breaking the layout.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaDatabase className="benefit-icon" />
              <div>
                <h4>Custom Post Types</h4>
                <p>Organize your data logically (e.g., Portfolios, Testimonials, Staff) instead of cramming everything into generic 'Posts'.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaShieldAlt className="benefit-icon" />
              <div>
                <h4>Hardcore Security</h4>
                <p>Implementing XML-RPC blocking, REST API restriction, and hiding the default login URLs to prevent hacking.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaTachometerAlt className="benefit-icon" />
              <div>
                <h4>Redis Object Caching</h4>
                <p>Lightning-fast database queries that make your WordPress admin area and frontend fly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Benefits */}
      <section className="benefits section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">The WordPress Advantage</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Total Ownership</h4>
                <p>Unlike proprietary SaaS platforms (like Wix or Squarespace), you own your WordPress site and your data 100%.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaRocket className="benefit-icon" />
              <div>
                <h4>Unmatched SEO</h4>
                <p>WordPress is loved by Google. Our custom code combined with tools like Yoast SEO ensures high organic rankings.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaUserFriends className="benefit-icon" />
              <div>
                <h4>User-Friendly Management</h4>
                <p>A gentle learning curve allows your non-technical staff to easily publish blogs, update images, and manage products.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCreditCard className="benefit-icon" />
              <div>
                <h4>Cost-Effective Scaling</h4>
                <p>Due to its massive open-source community, maintaining and adding new features to WP is highly cost-effective.</p>
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
            <h2 className="text-center text-white">Ready to Upgrade Your WordPress Experience?</h2>
            <p className="text-light-gray mt-3 text-center">Let's build a custom WP platform that is secure, blazing fast, and designed to convert.</p>
            <div className="cta-buttons mt-4 text-center">
              <Link to="/contact" className="btn btn-primary cta-btn">Discuss Your Project <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default WordpressDevelopmentPage
