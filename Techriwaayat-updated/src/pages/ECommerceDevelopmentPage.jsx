import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaShoppingCart, FaBoxOpen, FaChartLine, FaCheckCircle, 
  FaCreditCard, FaLock, FaMobileAlt, FaTachometerAlt, FaMinus, FaPlus, 
  FaStore, FaUsers, FaComments, FaTools, FaLaptopCode, FaMagento
} from 'react-icons/fa'
import { SiShopify, SiWoo, SiReact, SiNodedotjs, SiStripe } from 'react-icons/si'
import './ServicesShared.css'
import './ECommerceDevelopmentPage.css'
import AOS from 'aos'

const ECommerceDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "Which E-commerce platform is right for my business?", a: "It depends on your scale and needs. Shopify is great for rapid launches and ease of use, WooCommerce is excellent for WordPress integration and flexibility, while Custom React/Node or Magento is best for enterprise-level, highly customized logic." },
    { q: "Do you integrate third-party payment gateways?", a: "Yes, we integrate all major payment gateways including Stripe, PayPal, Square, and regional gateways ensuring secure and seamless transactions for your customers." },
    { q: "Can you migrate my existing store to a new platform?", a: "Absolutely. We provide secure data migration services to move your products, customer data, and order history from legacy systems to modern platforms with zero data loss." },
    { q: "Will my E-commerce website be mobile-friendly?", a: "Yes. Over 60% of e-commerce traffic comes from mobile devices. We ensure a mobile-first approach, so your store looks and performs flawlessly on smartphones and tablets." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaShoppingCart className="badge-icon" /> E-COMMERCE DEVELOPMENT</span>
          <h1 className="service-main-title">Build High-Converting <span className="highlight">Online Stores</span></h1>
          <p className="service-hero-description">Transform your retail business into a digital powerhouse with secure, scalable, and beautifully designed e-commerce platforms tailored to drive maximum sales.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Start Selling Online</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2 className="text-center">Dominate the <span className="highlight">Digital Marketplace</span></h2>
            <p className="mt-4 text-center">In today's competitive landscape, an online store needs to be more than just a digital catalog. It must be a fast, secure, and intuitive sales engine. We specialize in building e-commerce solutions that not only look stunning but are engineered for conversion-rate optimization (CRO), seamless checkout experiences, and easy backend management.</p>
          </div>
        </div>
      </section>

      {/* 3. Our E-Commerce Services */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Our E-Commerce Services</h2>
            <p className="section-subtitle text-center">Comprehensive solutions for modern digital retail.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <SiShopify className="offer-icon" />
              <h3>Shopify Development</h3>
              <p>Custom theme design, app integration, and setup for one of the world's leading e-commerce platforms. Perfect for quick and scalable launches.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <SiWoo className="offer-icon" />
              <h3>WooCommerce Stores</h3>
              <p>Flexible, open-source e-commerce built on WordPress. Ideal for content-heavy brands requiring deep customization and SEO advantages.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaLaptopCode className="offer-icon" />
              <h3>Custom Marketplaces</h3>
              <p>Bespoke e-commerce applications built from scratch using React and Node.js for complex business logic, B2B portals, or multi-vendor platforms.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaTools className="offer-icon" />
              <h3>Platform Migration</h3>
              <p>Seamlessly transfer your existing store, products, and customer data to a faster, more modern e-commerce platform with zero downtime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. High-Converting Storefronts */}
      <section className="high-converting-storefronts section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">High-Converting <span className="highlight">Storefronts</span></h2>
            <p className="section-subtitle text-center">Design that guides visitors effortlessly from product discovery to checkout.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>Optimized for Sales (CRO)</h3>
              <p>Driving traffic to your store is only half the battle. If your website is confusing or slow, you lose sales instantly. We utilize Conversion Rate Optimization (CRO) best practices to design frictionless user journeys that maximize your Revenue Per Visitor (RPV).</p>
              
              <h3 className="mt-4">Our Frontend Focus:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Frictionless Checkout:</strong> Designing one-page or streamlined multi-step checkouts that drastically reduce shopping cart abandonment rates.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Mobile-First Shopping:</strong> With mobile commerce dominating the market, we ensure your store features thumb-friendly navigation, sticky add-to-cart buttons, and ultra-fast mobile loading.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Intelligent Search:</strong> Integrating AI-powered predictive search and advanced filtering (facets) so customers find exactly what they want in seconds.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Trust Signals:</strong> Strategically placing verified reviews, trust badges, and clear return policies to build buyer confidence.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop" alt="High Converting E-commerce Store" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Scalable E-commerce Architecture */}
      <section className="ecommerce-architecture section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Scalable <span className="highlight">Architecture</span> & Integrations</h2>
            <p className="section-subtitle text-center">Robust backend systems that handle peak holiday traffic without breaking.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>Enterprise-Grade Backend</h3>
              <p>As your store grows, managing inventory, shipping, and customer data becomes complex. We build robust backend systems that integrate seamlessly with your existing enterprise software, ensuring your operations remain smooth during Black Friday traffic spikes.</p>
              
              <h3 className="mt-4">Backend Capabilities:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Headless Commerce:</strong> Decoupling the frontend (React/Next.js) from the backend (Shopify Plus/Magento) for unparalleled speed and omnichannel selling.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>ERP & CRM Integration:</strong> Connecting your store directly to Salesforce, SAP, or custom ERPs to sync inventory, pricing, and customer data in real-time.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Payment Gateway Mastery:</strong> Secure integration of global processors (Stripe, PayPal) and local solutions, including multi-currency and crypto payments.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Automated Fulfillment:</strong> Connecting your backend directly with 3PL providers, FedEx, UPS, or custom warehouse systems for hands-off order processing.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop" alt="E-commerce Architecture Backend" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
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
              <p>We combine stunning aesthetics with rock-solid engineering to build stores that load in milliseconds and convert visitors into loyal customers.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>Conversion Optimized:</strong> UI/UX focused on reducing cart abandonment.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Blazing Fast Speed:</strong> Optimized assets and caching for instant load times.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Bank-Grade Security:</strong> SSL, secure gateways, and PCI-DSS compliance.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Scalable Architecture:</strong> Built to handle major traffic spikes during sales events.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="ecommerce-mockup">
                <div className="mockup-nav">
                  <span className="logo">StoreFront</span>
                  <FaShoppingCart className="cart-icon" />
                </div>
                <div className="mockup-hero"></div>
                <div className="mockup-products">
                  <div className="m-prod"></div>
                  <div className="m-prod"></div>
                  <div className="m-prod"></div>
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
            <h2 className="text-center text-white">Development Process</h2>
            <p className="section-subtitle text-center text-light-gray">A streamlined approach to launch your store successfully.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Strategy & Planning</h3>
              <p>Analyzing your target market, product catalog, and selecting the optimal platform.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>UI/UX Design</h3>
              <p>Creating user journeys focused on effortless navigation and intuitive checkout.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>Development</h3>
              <p>Building the storefront, integrating inventory management, and CMS setup.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>Payment & QA</h3>
              <p>Integrating secure payment gateways and rigorous testing across all devices.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Launch & Scale</h3>
              <p>Deploying your store live, implementing SEO, and providing ongoing support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies We Use */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Technologies We Use</h2>
            <p className="section-subtitle text-center">Industry-leading platforms and frameworks.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><SiShopify className="tech-icon shopify"/><span>Shopify</span></div>
            <div className="tech-item"><SiWoo className="tech-icon woo"/><span>WooCommerce</span></div>
            <div className="tech-item"><FaMagento className="tech-icon magento"/><span>Magento</span></div>
            <div className="tech-item"><SiReact className="tech-icon react"/><span>React.js</span></div>
            <div className="tech-item"><SiNodedotjs className="tech-icon node"/><span>Node.js</span></div>
            <div className="tech-item"><SiStripe className="tech-icon stripe"/><span>Stripe API</span></div>
          </div>
        </div>
      </section>

      {/* 7. Types of Stores We Build */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Types of Stores We Build</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <h3>B2C Retail Stores</h3>
              <p>Direct-to-consumer storefronts optimized for emotional engagement and fast checkouts.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <h3>B2B Wholesale Portals</h3>
              <p>Complex portals with custom pricing tiers, bulk ordering, and inventory synchronization.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Multi-Vendor Marketplaces</h3>
              <p>Platforms like Amazon or Etsy, allowing multiple independent sellers to manage their own products.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <h3>Subscription Boxes</h3>
              <p>Recurring billing systems for monthly product deliveries and membership services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Features */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Essential E-Commerce Features</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaMobileAlt className="benefit-icon" />
              <div>
                <h4>Mobile-First Design</h4>
                <p>Fully responsive layouts that make mobile shopping a breeze.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCreditCard className="benefit-icon" />
              <div>
                <h4>Secure Checkouts</h4>
                <p>Frictionless, multi-step or single-page checkouts to minimize cart abandonment.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaBoxOpen className="benefit-icon" />
              <div>
                <h4>Inventory Management</h4>
                <p>Real-time stock tracking and automated alerts for low inventory.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaTachometerAlt className="benefit-icon" />
              <div>
                <h4>Analytics Dashboard</h4>
                <p>Detailed insights into sales, customer behavior, and traffic sources.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Benefits */}
      <section className="benefits section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Business Benefits</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaStore className="benefit-icon" />
              <div>
                <h4>24/7 Global Reach</h4>
                <p>Your store never closes. Sell to customers across the world at any time of day.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaChartLine className="benefit-icon" />
              <div>
                <h4>Increased Margins</h4>
                <p>Lower overhead costs compared to physical retail means higher profit margins.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaUsers className="benefit-icon" />
              <div>
                <h4>Customer Data Insights</h4>
                <p>Understand your buyers deeply to offer personalized marketing and retargeting.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaLock className="benefit-icon" />
              <div>
                <h4>Brand Authority</h4>
                <p>A professional, high-end online presence builds immediate trust with new customers.</p>
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
            <h2 className="text-center text-white">Ready to Launch Your Online Store?</h2>
            <p className="text-light-gray mt-3 text-center">Partner with us to build an e-commerce platform that drives real growth.</p>
            <div className="cta-buttons mt-4 text-center">
              <Link to="/contact" className="btn btn-primary cta-btn">Get a Free Estimate <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ECommerceDevelopmentPage
