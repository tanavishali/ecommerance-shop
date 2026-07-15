import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaRobot, FaBrain, FaChartLine, FaCheckCircle, 
  FaCogs, FaProjectDiagram, FaServer, FaEye, FaMinus, FaPlus, 
  FaComments, FaNetworkWired, FaCodeBranch, FaClock, FaAws
} from 'react-icons/fa'
import { SiPython, SiTensorflow, SiPytorch, SiOpenai } from 'react-icons/si'
import './ServicesShared.css'
import './AiAutomationPage.css'
import AOS from 'aos'

const AiAutomationPage = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    { q: "What is AI Automation and how can it help my business?", a: "AI Automation combines artificial intelligence with robotic process automation (RPA) to handle repetitive tasks, analyze massive datasets, and make intelligent decisions, saving you time and drastically reducing operational costs." },
    { q: "Is my data secure when using your AI solutions?", a: "Yes. We prioritize enterprise-grade security. All data used for training and inference is heavily encrypted. We also offer on-premise deployments so your proprietary data never leaves your servers." },
    { q: "How long does it take to implement an AI solution?", a: "A basic chatbot or automation script can be deployed in a few weeks. However, complex predictive models or computer vision systems that require extensive data training can take 2-4 months to perfect." },
    { q: "Do I need technical expertise to use the AI tools you build?", a: "Not at all! We build intuitive, user-friendly dashboards and integrate the AI seamlessly into your existing workflows (like Slack, CRM, or web apps), so your team can use them effortlessly." }
  ]

  return (
    <div className="service-page">
      {/* 1. Hero Section */}
      <section className="service-hero">
        <div className="service-hero-container" data-aos="fade-up">
          <span className="service-badge"><FaBrain className="badge-icon" /> AI & AUTOMATION</span>
          <h1 className="service-main-title">Intelligent <span className="highlight">Automation</span> & Machine Learning</h1>
          <p className="service-hero-description">Transform your business operations with cutting-edge Artificial Intelligence. We build custom AI models, smart chatbots, and automated workflows that scale your efficiency and drive data-backed decisions.</p>
          <div className="hero-cta-buttons">
            <Link to="/contact" className="btn btn-primary cta-btn">Discuss AI Strategy</Link>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="service-overview section-padding" data-aos="fade-up">
        <div className="container">
          <div className="overview-content text-center">
            <h2 className="text-center">Work Smarter, Not Harder with <span className="highlight">AI</span></h2>
            <p className="mt-4 text-center">In the digital era, relying on manual processes is a bottleneck to scaling. We help forward-thinking companies adopt AI-driven architectures. From automating mundane data-entry tasks to predicting market trends with machine learning, we turn your raw data into a competitive advantage.</p>
          </div>
        </div>
      </section>

      {/* 3. Our AI & Automation Services */}
      <section className="what-we-offer section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Our AI & Automation Services</h2>
            <p className="section-subtitle text-center">Custom intelligence solutions engineered for your industry.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card" data-aos="fade-up" data-aos-delay="100">
              <FaRobot className="offer-icon" />
              <h3>Smart Chatbots & NLP</h3>
              <p>Deploy AI conversational agents powered by LLMs (like GPT-4) to handle 24/7 customer support, lead generation, and internal knowledge bases.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="200">
              <FaChartLine className="offer-icon" />
              <h3>Predictive Analytics</h3>
              <p>Harness historical data to forecast sales, detect anomalies, predict maintenance needs, and optimize supply chain operations.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="300">
              <FaCogs className="offer-icon" />
              <h3>Process Automation (RPA)</h3>
              <p>Eliminate human error by automating repetitive tasks like invoice processing, data extraction, and cross-platform synchronization.</p>
            </div>
            <div className="offer-card" data-aos="fade-up" data-aos-delay="400">
              <FaEye className="offer-icon" />
              <h3>Computer Vision</h3>
              <p>Build systems that can 'see'. From facial recognition and object detection to automated quality control in manufacturing lines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Agentic AI Integration */}
      <section className="agentic-ai section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Next-Gen <span className="highlight">Agentic AI & LLMs</span></h2>
            <p className="section-subtitle text-center">Moving beyond simple chatbots to autonomous AI agents that get work done.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center'}}>
            <div className="split-text" data-aos="fade-right">
              <h3>Custom Enterprise AI</h3>
              <p>While public tools like ChatGPT are great, they don't know your business. We build secure, custom LLM (Large Language Model) applications trained exclusively on your proprietary data. These agents can autonomously execute tasks, write reports, and manage customer interactions without hallucinating.</p>
              
              <h3 className="mt-4">How We Integrate AI:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>RAG Architecture:</strong> Implementing Retrieval-Augmented Generation (RAG) so the AI fetches factual answers directly from your company's internal PDFs, databases, and wikis.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Autonomous Agents:</strong> Building multi-agent systems (using LangChain or AutoGen) where AI agents collaborate, review each other's work, and autonomously complete complex multi-step workflows.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>API Integration:</strong> Connecting OpenAI, Anthropic, or open-source models (Llama 3) directly into your existing SaaS products or internal dashboards.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Data Privacy First:</strong> Ensuring strict data governance so your intellectual property is never used to train public models.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-left">
               <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop" alt="Agentic AI and LLM" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Robotic Process Automation */}
      <section className="rpa-automation section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Robotic Process <span className="highlight">Automation (RPA)</span></h2>
            <p className="section-subtitle text-center">Eliminate tedious manual labor and accelerate operational throughput.</p>
          </div>
          <div className="split-layout" style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
            <div className="split-text" data-aos="fade-left">
              <h3>Automate the Mundane</h3>
              <p>If your employees are spending hours copy-pasting data between spreadsheets, CRMs, and email clients, you are wasting valuable human capital. We develop custom software bots that mimic human actions on computers, working 24/7 with 100% accuracy.</p>
              
              <h3 className="mt-4">Our Automation Solutions:</h3>
              <ul className="custom-list mt-3">
                <li><FaCheckCircle className="list-icon" /> <strong>Data Extraction & OCR:</strong> Automatically scanning thousands of invoices, receipts, or legal documents, extracting key data points, and feeding them into your accounting software.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Workflow Automation:</strong> Building complex logic flows using tools like Zapier, Make (Integromat), or custom Node.js/Python scripts to sync data across APIs instantly.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Automated Reporting:</strong> Scripts that fetch daily analytics from multiple platforms, compile them into beautiful PDF/Excel reports, and email them to stakeholders.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Legacy System Bridging:</strong> Creating bots that interact with old, API-less legacy software via UI automation, connecting them to modern cloud applications seamlessly.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" style={{background: 'transparent', padding: 0}} data-aos="fade-right">
               <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" alt="Robotic Process Automation" style={{width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
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
              <p>We don't just use buzzwords. We deliver practical AI applications that provide immediate value, reduce operational costs, and seamlessly integrate with your current tech stack.</p>
              <ul className="custom-list mt-4">
                <li><FaCheckCircle className="list-icon" /> <strong>Custom Models:</strong> Trained exclusively on your business data.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>High Accuracy:</strong> Rigorous testing and fine-tuning for maximum precision.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Seamless Integration:</strong> Connecting AI with your existing APIs and software.</li>
                <li><FaCheckCircle className="list-icon" /> <strong>Data Privacy:</strong> Enterprise-level security and strict compliance protocols.</li>
              </ul>
            </div>
            <div className="split-image-placeholder" data-aos="fade-left">
              <div className="ai-mockup">
                <div className="ai-node-network">
                  <div className="node node-1"></div>
                  <div className="node node-2"></div>
                  <div className="node node-3"></div>
                  <div className="node node-main"><FaBrain className="brain-core"/></div>
                  <div className="connection line-1"></div>
                  <div className="connection line-2"></div>
                  <div className="connection line-3"></div>
                </div>
                <div className="ai-console">
                  <p><span className="keyword">Status:</span> Model Training Complete.</p>
                  <p><span className="keyword">Accuracy:</span> 99.4%</p>
                  <p><span className="keyword">Action:</span> Deploying to Production...</p>
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
            <h2 className="text-center text-white">Our AI Implementation Process</h2>
            <p className="section-subtitle text-center text-light-gray">From data collection to intelligent decision making.</p>
          </div>
          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-large">01</div>
              <h3>Discovery</h3>
              <p>Identifying bottlenecks and defining the specific business problem AI will solve.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-large">02</div>
              <h3>Data Prep</h3>
              <p>Gathering, cleaning, and structuring your raw data to make it machine-readable.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-large">03</div>
              <h3>Model Training</h3>
              <p>Selecting the right algorithms and training the model to achieve high accuracy.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number-large">04</div>
              <h3>Integration</h3>
              <p>Deploying the AI model via secure APIs directly into your software ecosystem.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step-number-large">05</div>
              <h3>Optimization</h3>
              <p>Continuous monitoring and retraining as new data flows in to ensure peak performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies We Use */}
      <section className="technologies section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">AI Stack We Master</h2>
            <p className="section-subtitle text-center">Using the most powerful libraries and cloud infrastructure.</p>
          </div>
          <div className="tech-grid" data-aos="zoom-in">
            <div className="tech-item"><SiPython className="tech-icon python"/><span>Python</span></div>
            <div className="tech-item"><SiTensorflow className="tech-icon tensorflow"/><span>TensorFlow</span></div>
            <div className="tech-item"><SiPytorch className="tech-icon pytorch"/><span>PyTorch</span></div>
            <div className="tech-item"><SiOpenai className="tech-icon openai"/><span>OpenAI API</span></div>
            <div className="tech-item"><FaNetworkWired className="tech-icon langchain"/><span>LangChain</span></div>
            <div className="tech-item"><FaAws className="tech-icon aws"/><span>AWS / Azure</span></div>
          </div>
        </div>
      </section>

      {/* 7. AI Solutions We Build */}
      <section className="website-types section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">AI Solutions We Build</h2>
          </div>
          <div className="types-grid">
            <div className="type-card" data-aos="fade-up">
              <h3>Recommendation Engines</h3>
              <p>Algorithms that suggest products or content to users based on their behavioral history, boosting sales.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="100">
              <h3>Document Processing (OCR)</h3>
              <p>Extracting text and data from scanned invoices, receipts, and PDFs automatically into your database.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Sentiment Analysis</h3>
              <p>Analyzing customer reviews and social media mentions to gauge public perception of your brand.</p>
            </div>
            <div className="type-card" data-aos="fade-up" data-aos-delay="300">
              <h3>Automated Scheduling</h3>
              <p>Smart systems that coordinate calendars, book appointments, and allocate resources dynamically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Features Included */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2 className="text-center">Key Implementation Features</h2>
          </div>
          <div className="benefits-list-grid">
            <div className="benefit-item" data-aos="fade-right">
              <FaProjectDiagram className="benefit-icon" />
              <div>
                <h4>Seamless API Integration</h4>
                <p>We connect AI endpoints directly to your existing web and mobile applications.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaServer className="benefit-icon" />
              <div>
                <h4>Cloud or On-Premise</h4>
                <p>Flexible deployment options to meet strict data compliance and security needs.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaClock className="benefit-icon" />
              <div>
                <h4>Real-Time Processing</h4>
                <p>Models optimized for ultra-low latency inference to deliver instant results.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCodeBranch className="benefit-icon" />
              <div>
                <h4>Scalable Microservices</h4>
                <p>AI modules built as independent microservices so your platform scales effortlessly.</p>
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
              <FaChartLine className="benefit-icon" />
              <div>
                <h4>Massive Cost Reduction</h4>
                <p>Automate repetitive labor, allowing your team to focus on high-value creative work.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Eliminate Human Error</h4>
                <p>Machines don't get tired. Ensure 100% accuracy in data entry and compliance checks.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-right">
              <FaRobot className="benefit-icon" />
              <div>
                <h4>24/7 Operations</h4>
                <p>Provide round-the-clock customer support and processing without paying overtime.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-left">
              <FaBrain className="benefit-icon" />
              <div>
                <h4>Uncover Hidden Insights</h4>
                <p>Find patterns in your data that humans would never notice, leading to better decisions.</p>
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
            <h2 className="text-center text-white">Ready to Automate Your Future?</h2>
            <p className="text-light-gray mt-3 text-center">Let's build intelligent systems that accelerate your growth and efficiency.</p>
            <div className="cta-buttons mt-4 text-center">
              <Link to="/contact" className="btn btn-primary cta-btn">Schedule an AI Consultation <FaComments className="ms-2"/></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AiAutomationPage
