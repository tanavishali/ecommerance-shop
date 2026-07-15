import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaSearch, FaChartLine, FaCheckCircle, FaGlobe, 
  FaMapMarkerAlt, FaShoppingCart, FaBuilding, FaMinus, FaPlus, 
  FaComments, FaLink, FaFileAlt, FaGoogle, FaChartBar, FaChartPie
} from 'react-icons/fa'
import './ServicesShared.css'
import './SeoOptimizationPage.css'
import AOS from 'aos'

const SeoOptimizationPage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "How long does it take to see results from SEO?", a: "SEO is a long-term strategy. While some technical fixes can yield quick improvements, significant shifts in organic rankings and traffic typically take 3 to 6 months depending on the competitiveness of your industry." },
    { q: "Do you guarantee #1 rankings on Google?", a: "No ethical SEO agency can guarantee a #1 ranking due to Google's constantly changing algorithms. However, we guarantee the implementation of proven, data-driven, and white-hat strategies that consistently improve your visibility and traffic." },
    { q: "What is the difference between On-Page and Off-Page SEO?", a: "On-Page SEO involves optimizing elements on your website (content, meta tags, site speed). Off-Page SEO focuses on building your site's authority across the web, primarily through earning high-quality backlinks from other reputable websites." },
    { q: "Do I need Local SEO or Global SEO?", a: "If you serve customers at a physical location (like a clinic or restaurant), Local SEO is vital. If you are a SaaS company or an e-commerce brand shipping worldwide, a National or Global SEO strategy is required." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaSearch className="badge-icon" /> SEO OPTIMIZATION</span>
          <h1 className="service-main-title">Dominate Search Rankings & Drive <span className="highlight">Organic Traffic</span></h1>
          <p className="service-hero-description">Stop hiding on page two. Our data-driven SEO strategies push your website to the top of search engine results, turning organic traffic into loyal, paying customers.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Get a Free SEO Audit</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2 className="text-center">Visibility is Your Greatest <span className="highlight">Asset</span></h2>
            <p className="mt-4 text-center">In the modern digital landscape, having a beautiful website isn't enough. If your target audience can't find you on Google, you're losing revenue to competitors. We specialize in comprehensive SEO—from technical audits to aggressive link-building—ensuring your brand is the first answer when your customers ask a question.</p>
          </div>
        </div>
      </section>

      {/* 3. Our SEO Services */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Our Core SEO Services</h2>
            <p className="section-subtitle text-center">A holistic approach to search engine dominance.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <FaSearch className="offer-icon" />
              <h3>Keyword Research</h3>
              <p>Identifying high-intent, low-competition keywords that your ideal customers are actively searching for.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <FaFileAlt className="offer-icon" />
              <h3>On-Page Optimization</h3>
              <p>Optimizing meta tags, headers, URL structures, and content formatting to align perfectly with search intent.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaLink className="offer-icon" />
              <h3>Off-Page & Link Building</h3>
              <p>Acquiring high-authority backlinks from trusted domains to skyrocket your website's domain authority (DA).</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaCheckCircle className="offer-icon" />
              <h3>Technical SEO</h3>
              <p>Fixing crawl errors, improving site speed, implementing schema markup, and ensuring mobile flawless rendering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. On-Page SEO Mastery */}
      <section className="on-page-seo section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Mastering <span className="highlight">On-Page SEO</span></h2>
            <p className="section-subtitle text-center">Optimizing every pixel of your website to speak Google's language.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'flex-start'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>What is On-Page SEO?</h3>
              <p>On-Page SEO (or On-Site SEO) refers to the practice of optimizing web pages to earn organic traffic and improve search engine rankings. This involves publishing relevant, high-quality content and optimizing HTML tags (title, meta, and header) and images.</p>
              
              <h3 className="mt-4">Our On-Page Strategy Includes:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Keyword Optimization:</strong> Strategic placement of primary and LSI keywords in titles, H1/H2 tags, and throughout the body content naturally.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Meta Tags Optimization:</strong> Crafting compelling Title Tags and Meta Descriptions that not only rank but significantly boost Click-Through Rates (CTR) from the search results.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Content Excellence:</strong> Google loves content that answers user intent. We optimize for TF-IDF (Term Frequency-Inverse Document Frequency) and ensure comprehensive topic coverage.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Internal Linking Structure:</strong> Creating a logical hierarchy and distributing page authority throughout your site using optimized anchor text.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Image SEO:</strong> Compressing media files, adding descriptive Alt text, and utilizing Next-Gen formats like WebP to enhance speed and accessibility.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Schema Markup:</strong> Implementing JSON-LD structured data to help search engines understand your content better and win rich snippets (stars, FAQs, pricing) in search results.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" alt="On Page SEO" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Off-Page SEO Authority */}
      <section className="off-page-seo section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Building <span className="highlight">Off-Page Authority</span></h2>
            <p className="section-subtitle text-center">Establishing your website as the undisputed industry leader across the internet.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'flex-start', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>What is Off-Page SEO?</h3>
              <p>While On-Page SEO is about what your site is about, Off-Page SEO is about how authoritative and popular your site is. It encompasses all the actions taken outside of your own website to impact your rankings within search engine results pages (SERPs).</p>
              
              <h3 className="mt-4">Our Off-Page & Link Building Tactics:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>High-Quality Backlink Outreach:</strong> We conduct manual outreach to authoritative blogs, news sites, and industry portals to earn high Domain Authority (DA) contextual backlinks.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Digital PR & Brand Mentions:</strong> Getting your brand mentioned in major publications and news outlets. Even unlinked brand mentions serve as strong trust signals to Google.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Guest Posting:</strong> Writing premium, expert-level articles for top-tier websites in your niche to drive referral traffic and link equity back to your core pages.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Local SEO & Citations:</strong> For businesses with physical locations, we build and manage citations (NAP: Name, Address, Phone) across directories like Yelp, YellowPages, and localized industry listings.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Social Signals:</strong> While not a direct ranking factor, strong social media presence and content sharing drive traffic and accelerate the indexation of new content.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Toxic Link Auditing:</strong> Continuously monitoring your backlink profile and disavowing spammy or toxic links that competitors might build to trigger a Google penalty against your site.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" alt="Off Page SEO" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
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
              <p>We don't rely on guesswork. Our SEO methodology is strictly data-driven, focusing on long-term sustainability rather than risky, short-term hacks.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>White-Hat Techniques:</strong> 100% compliance with Google's Webmaster Guidelines.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Transparent Reporting:</strong> Monthly live dashboards showing traffic, rankings, and ROI.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Content Excellence:</strong> Expertly written content that ranks well and converts readers.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Technical Expertise:</strong> We're developers first, so we fix complex code issues seamlessly.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="seo-mockup">
                <div className="seo-mockup-header">
                  <div className="seo-dot red"></div>
                  <div className="seo-dot yellow"></div>
                  <div className="seo-dot green"></div>
                  <span className="seo-url">Traffic Analytics</span>
                </div>
                <div className="seo-chart-container">
                  <div className="seo-line-chart">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,100 L0,80 Q25,90 50,50 T100,10 L100,100 Z" className="seo-area" />
                      <path d="M0,80 Q25,90 50,50 T100,10" className="seo-line" />
                    </svg>
                  </div>
                  <div className="seo-stats">
                    <div className="seo-stat-box">
                      <span className="stat-label">Organic Traffic</span>
                      <span className="stat-value">+342%</span>
                    </div>
                    <div className="seo-stat-box">
                      <span className="stat-label">Top 3 Keywords</span>
                      <span className="stat-value">128</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEO Process */}
      <section className="dev-process section-padding bg-dark">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center text-white">Our Proven SEO Process</h2>
            <p className="section-subtitle text-center text-light-gray">A systematic roadmap to page one.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Deep Audit</h3>
              <p>Analyzing your current website for technical errors, speed issues, and content gaps.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>Strategy & Keywords</h3>
              <p>Mapping out a content and keyword strategy based on intense competitor research.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>On-Site Optimization</h3>
              <p>Executing technical fixes, rewriting meta tags, and optimizing existing page content.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>Authority Building</h3>
              <p>Launching outreach campaigns to secure high-quality backlinks and digital PR mentions.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Monitor & Refine</h3>
              <p>Tracking rank fluctuations and adjusting the strategy monthly for continuous growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tools We Use */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">SEO Tools We Use</h2>
            <p className="section-subtitle text-center">Leveraging enterprise-grade marketing software.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><FaGoogle className="tech-icon google"/><span>Google Analytics</span></div>
            <div className="tech-item"><FaChartLine className="tech-icon ahrefs"/><span>Ahrefs</span></div>
            <div className="tech-item"><FaChartBar className="tech-icon semrush"/><span>SEMrush</span></div>
            <div className="tech-item"><FaSearch className="tech-icon moz"/><span>Moz Pro</span></div>
            <div className="tech-item"><FaChartPie className="tech-icon console"/><span>Search Console</span></div>
            <div className="tech-item"><FaGlobe className="tech-icon screamingfrog"/><span>Screaming Frog</span></div>
          </div>
        </div>
      </section>

      {/* 7. SEO Services Types */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Specialized SEO Services</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <FaMapMarkerAlt className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>Local SEO</h3>
              <p>Dominate local maps and searches. Perfect for clinics, restaurants, and local service businesses.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <FaShoppingCart className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>E-Commerce SEO</h3>
              <p>Optimize thousands of product pages to drive highly targeted buyers directly to your checkout.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <FaBuilding className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>Enterprise SEO</h3>
              <p>Large-scale strategies for massive websites with tens of thousands of pages and complex architectures.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <FaGlobe className="type-icon mb-3 text-primary" style={{fontSize: '2rem'}}/>
              <h3>International SEO</h3>
              <p>Hreflang implementation and multi-lingual strategies to conquer search engines across different countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Features */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">What's Included in Our Campaigns</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaSearch className="benefit-icon" />
              <div>
                <h4>In-Depth Competitor Analysis</h4>
                <p>We reverse-engineer your top competitors to steal their traffic strategies and backlink profiles.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaFileAlt className="benefit-icon" />
              <div>
                <h4>Content Strategy & Briefs</h4>
                <p>We don't just optimize old pages; we provide precise briefs for new content that is guaranteed to rank.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaChartLine className="benefit-icon" />
              <div>
                <h4>Core Web Vitals Optimization</h4>
                <p>We ensure your site passes Google's strict speed and UX metrics for maximum ranking favorability.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaLink className="benefit-icon" />
              <div>
                <h4>Toxic Link Disavowal</h4>
                <p>Protecting your site from negative SEO by auditing and disavowing spammy inbound links.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Benefits */}
      <section className="benefits section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">The ROI of Great SEO</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaChartLine className="benefit-icon" />
              <div>
                <h4>Compound Traffic Growth</h4>
                <p>Unlike paid ads that stop when you stop paying, organic traffic compounds and grows exponentially over time.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Higher Conversion Rates</h4>
                <p>Organic traffic is highly targeted. Users actively searching for your service are significantly more likely to buy.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaBuilding className="benefit-icon" />
              <div>
                <h4>Increased Brand Authority</h4>
                <p>Ranking on the first page of Google instantly establishes trust and positions you as an industry leader.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaSearch className="benefit-icon" />
              <div>
                <h4>Lower Customer Acquisition Cost</h4>
                <p>Over the long run, SEO provides a drastically lower CPA compared to continuous PPC campaigns.</p>
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
            <h2 className="text-center text-white">Ready to Dominate Page One?</h2>
            <p className="text-light-gray mt-3 text-center">Stop losing customers to your competitors. Claim your free comprehensive SEO audit today.</p>
            <div className="cta-buttons mt-4 text-center">
              <Link to="/contact" className="btn btn-primary cta-btn">Request Free SEO Audit <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default SeoOptimizationPage
