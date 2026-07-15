import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaClock, FaTimes, FaPaperPlane, FaCloudUploadAlt, FaFileAlt, FaUsers } from 'react-icons/fa'
import AOS from 'aos'
import './CareerPage.css'

const CareerPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [isApplying, setIsApplying] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [cvFile, setCvFile] = useState(null)
  const fileInputRef = useRef(null)

  // Load application counts from local storage or set defaults
  const [appCounts, setAppCounts] = useState({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    coverLetter: ''
  })

  // Internship Data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (Intern)",
      type: "Internship",
      location: "Remote",
      time: "Full-Time",
      department: "Engineering",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Basic understanding of HTML, CSS, and JavaScript",
        "Familiarity with React.js is a plus",
        "Strong willingness to learn and adapt",
        "Good problem-solving skills and attention to detail"
      ],
      responsibilities: [
        "Assist in building and maintaining web applications",
        "Write clean, maintainable, and efficient code",
        "Collaborate with senior developers and designers"
      ]
    },
    {
      id: 2,
      title: "Senior Frontend Developer (Intern)",
      type: "Internship",
      location: "On-site / Remote",
      time: "Full-Time",
      department: "Engineering",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Experience in React.js and modern JavaScript",
        "Understanding of state management",
        "Experience with responsive design and modern CSS frameworks",
        "Excellent leadership and communication skills"
      ],
      responsibilities: [
        "Lead frontend architecture and best practices",
        "Mentor junior developers and perform code reviews",
        "Build scalable and high-performance UI components"
      ]
    },
    {
      id: 3,
      title: "Full Stack Developer (Intern)",
      type: "Internship",
      location: "Remote",
      time: "Full-Time",
      department: "Engineering",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Basic knowledge in MERN stack (MongoDB, Express, React, Node.js)",
        "Understanding of RESTful APIs",
        "Familiarity with database concepts",
        "Ability to learn end-to-end feature development"
      ],
      responsibilities: [
        "Assist in designing backend services and APIs",
        "Integrate frontend applications with server-side logic",
        "Ensure application performance and quality"
      ]
    },
    {
      id: 4,
      title: "PHP Laravel Developer (Intern)",
      type: "Internship",
      location: "On-site",
      time: "Full-Time",
      department: "Engineering",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Basic knowledge of PHP and Laravel framework",
        "Understanding of MySQL and database design",
        "Understanding of MVC design patterns",
        "Willingness to learn API integrations"
      ],
      responsibilities: [
        "Assist in developing web-based PHP applications",
        "Learn and build innovative applications",
        "Maintain code utilizing standard development tools"
      ]
    },
    {
      id: 5,
      title: "SEO Specialist (Intern)",
      type: "Internship",
      location: "Remote",
      time: "Full-Time",
      department: "Marketing",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Passion for SEO and digital marketing",
        "Basic knowledge of SEO practices",
        "Willingness to learn SEO reporting tools",
        "Good writing and analytical skills"
      ],
      responsibilities: [
        "Assist in developing SEO strategies",
        "Conduct basic keyword research",
        "Help optimize website content and landing pages"
      ]
    },
    {
      id: 6,
      title: "WordPress Developer (Intern)",
      type: "Internship",
      location: "Remote",
      time: "Part-Time / Full-Time",
      department: "Engineering",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Basic understanding of PHP",
        "Familiarity with WordPress themes and plugins",
        "Knowledge of WordPress dashboard",
        "Basic understanding of front-end technologies (HTML, CSS)"
      ],
      responsibilities: [
        "Assist in designing new features and functionality",
        "Help setup and manage WordPress sites",
        "Learn technical aspects of the CMS"
      ]
    },
    {
      id: 7,
      title: "Web Developer (Intern)",
      type: "Internship",
      location: "Remote",
      time: "Part-Time",
      department: "Engineering",
      qualifications: [
        "Minimum Qualification: Intermediate (Inter / 12th Grade)"
      ],
      requirements: [
        "Basic knowledge of web development (HTML, CSS, JS)",
        "Passion for coding and building websites",
        "Familiarity with version control (Git) is a plus",
        "Ability to follow instructions and learn quickly"
      ],
      responsibilities: [
        "Assist the development team with basic coding tasks",
        "Test web applications for bugs and issues",
        "Help maintain and update existing websites"
      ]
    }
  ]

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
    
    // Initialize application counts
    const storedCounts = JSON.parse(localStorage.getItem('internshipAppCounts')) || {};
    
    // Ensure all jobs have a count (default some to show realism, e.g., 99 for one to test limit)
    const initialCounts = { ...storedCounts };
    let changed = false;
    jobs.forEach(job => {
      if (initialCounts[job.id] === undefined) {
        // Just for demo, let's make job ID 2 have 99 applications to easily test the limit
        initialCounts[job.id] = job.id === 2 ? 99 : Math.floor(Math.random() * 20) + 10;
        changed = true;
      }
    });

    if (changed) {
      localStorage.setItem('internshipAppCounts', JSON.stringify(initialCounts));
    }
    setAppCounts(initialCounts);
  }, [])

  // Filter Jobs
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleApplyClick = () => {
    setIsApplying(true)
  }

  const handleCloseModal = () => {
    setSelectedJob(null)
    setIsApplying(false)
    setCvFile(null)
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setCvFile(file);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault()
    
    if (!cvFile) {
      alert("Please upload your CV before submitting.");
      return;
    }

    // Check limit
    if (appCounts[selectedJob.id] >= 100) {
      alert("Sorry, applications for this internship have reached the limit of 100.");
      return;
    }

    // Increment count
    const newCount = appCounts[selectedJob.id] + 1;
    const newCountsObj = { ...appCounts, [selectedJob.id]: newCount };
    setAppCounts(newCountsObj);
    localStorage.setItem('internshipAppCounts', JSON.stringify(newCountsObj));

    alert(`Application submitted successfully for ${selectedJob.title}! We will contact you soon.`)
    setFormData({ name: '', email: '', phone: '', linkedin: '', portfolio: '', coverLetter: '' })
    setCvFile(null)
    handleCloseModal()
  }

  return (
    <div className="career-page">
      {/* Hero Section */}
      <section className="career-hero" data-aos="fade-up">
        <div className="career-hero-container">
          <span className="career-badge"><FaBriefcase className="badge-icon" style={{marginRight: '8px'}} /> TECH RIWAAYAT FELLOWSHIP</span>
          <h1 className="career-main-title">Accelerate Your <span className="highlight">Career</span> with Elite Mentorship</h1>
          <p className="career-hero-desc">
            Stop making coffee and start writing production code. Our highly competitive internship program is designed to transform passionate beginners into industry-ready professionals through hands-on experience, direct mentorship from senior engineers, and real-world project delivery.
          </p>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section className="program-benefits section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Why Join Our <br className="mobile-break" /><span className="highlight">Internship Program?</span></h2>
            <p className="section-subtitle">We don't just offer internships; we build future tech leaders.</p>
          </div>
          <div className="benefits-list-grid mt-5">
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="100">
              <FaUsers className="benefit-icon" />
              <div>
                <h4>1-on-1 Senior Mentorship</h4>
                <p>Work directly under the guidance of industry veterans who will review your code, refine your architecture, and accelerate your learning curve.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="200">
              <FaBriefcase className="benefit-icon" />
              <div>
                <h4>Real Client Projects</h4>
                <p>No dummy tasks. You will contribute to actual enterprise applications, pushing code to production that thousands of users will interact with.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="300">
              <FaMapMarkerAlt className="benefit-icon" />
              <div>
                <h4>Flexible Remote Culture</h4>
                <p>Work from the comfort of your home or join us on-site. We evaluate you on the quality of your output, not the hours you sit at a desk.</p>
              </div>
            </div>
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="400">
              <FaFileAlt className="benefit-icon" />
              <div>
                <h4>Pre-Placement Offers (PPO)</h4>
                <p>Over 80% of our successful interns are offered full-time, highly paid engineering roles at Tech Riwaayat upon graduation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="application-process section-padding">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Our <br className="mobile-break" /><span className="highlight">Hiring Process</span></h2>
            <p className="section-subtitle">A transparent, 4-step journey to your dream internship.</p>
          </div>
          <div className="process-steps-grid mt-5">
            <div className="process-step" data-aos="fade-right" data-aos-delay="100">
              <h4>Application Review</h4>
              <p>Submit your updated CV along with your portfolio/GitHub. Our tech leads review every application manually to find passionate candidates.</p>
            </div>
            <div className="process-step" data-aos="fade-right" data-aos-delay="200">
              <h4>Technical Assessment</h4>
              <p>If shortlisted, you will be given a small, practical take-home assignment to gauge your coding style, logic, and problem-solving skills.</p>
            </div>
            <div className="process-step" data-aos="fade-left" data-aos-delay="300">
              <h4>Culture Fit Interview</h4>
              <p>A 30-minute video call with our engineering managers to discuss your goals, past projects, and see if you align with our core values.</p>
            </div>
            <div className="process-step" data-aos="fade-left" data-aos-delay="400">
              <h4>Offer & Onboarding</h4>
              <p>Congratulations! You receive the fellowship offer. We set you up with your company email, access to our repositories, and introduce you to your mentor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack-section section-padding bg-light">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <h2>Technologies You Will <br className="mobile-break" /><span className="highlight">Master</span></h2>
            <p className="section-subtitle">Work with the modern tech stack that powers enterprise applications.</p>
          </div>
          <div className="tech-stack-tags mt-4 text-center" data-aos="zoom-in">
            <span className="tech-tag">React.js</span>
            <span className="tech-tag">Next.js</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Laravel (PHP)</span>
            <span className="tech-tag">Python & AI</span>
            <span className="tech-tag">MongoDB</span>
            <span className="tech-tag">PostgreSQL</span>
            <span className="tech-tag">AWS Cloud</span>
            <span className="tech-tag">Docker</span>
            <span className="tech-tag">Figma</span>
            <span className="tech-tag">Git/GitHub</span>
          </div>
          
          {/* Search Bar Moved Here */}
          <div className="career-search-box mt-5" style={{maxWidth: '600px', margin: '40px auto 0'}}>
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for your dream internship..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section">
        <div className="jobs-container">
          <div className="jobs-header">
            <h2>Open Internships <span className="job-count">({filteredJobs.length})</span></h2>
          </div>

          <div className="jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => {
                const count = appCounts[job.id] || 0;
                const isFull = count >= 100;
                
                return (
                  <div 
                    className={`job-card ${isFull ? 'job-full' : ''}`} 
                    key={job.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="job-card-main">
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-meta">
                        <span className="meta-item"><FaBriefcase className="meta-icon"/> {job.department}</span>
                        <span className="meta-item"><FaMapMarkerAlt className="meta-icon"/> {job.location}</span>
                        <span className="meta-item"><FaClock className="meta-icon"/> {job.time}</span>
                      </div>
                    </div>
                    <div className="job-card-action">
                      <div className="applicants-count">
                        <FaUsers className="applicants-icon" />
                        <span className={isFull ? 'text-danger' : 'text-success'}>
                          {count} / 100 Applied
                        </span>
                      </div>
                      <span className="job-type-badge intern">
                        {job.type}
                      </span>
                      <button className="view-job-btn">View Details</button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="no-jobs-found">
                <h3>No internships found matching "{searchTerm}"</h3>
                <p>Try adjusting your search criteria or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Details & Application Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            
            {!isApplying ? (
              /* Job Details View */
              <div className="job-details-view">
                <div className="modal-header">
                  <div className="modal-header-top" style={{ justifyContent: 'flex-start', gap: '16px' }}>
                    <span className="job-type-badge intern">
                      {selectedJob.type}
                    </span>
                    {/* 
                    <div className="applicants-badge">
                      <FaUsers className="applicants-icon" />
                      <span className={appCounts[selectedJob.id] >= 100 ? 'text-danger' : 'text-success'}>
                        {appCounts[selectedJob.id] || 0} / 100 Applications
                      </span>
                    </div>
                    */}
                  </div>
                  <h2>{selectedJob.title}</h2>
                  <div className="job-meta" style={{ marginBottom: '24px' }}>
                    <span className="meta-item"><FaBriefcase className="meta-icon"/> {selectedJob.department}</span>
                    <span className="meta-item"><FaMapMarkerAlt className="meta-icon"/> {selectedJob.location}</span>
                    <span className="meta-item"><FaClock className="meta-icon"/> {selectedJob.time}</span>
                  </div>

                  {appCounts[selectedJob.id] >= 100 ? (
                    <button className="apply-btn disabled" disabled>
                      Applications Closed (Limit Reached)
                    </button>
                  ) : (
                    <button className="apply-btn" onClick={handleApplyClick}>
                      Apply for Internship <FaPaperPlane className="btn-icon" />
                    </button>
                  )}
                </div>

                <div className="modal-body">
                  <div className="job-req-section highlight-section">
                    <h3>Qualifications</h3>
                    <ul>
                      {selectedJob.qualifications.map((qual, i) => (
                        <li key={i}>{qual}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="job-req-section">
                    <h3>Requirements</h3>
                    <ul>
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="job-req-section">
                    <h3>Responsibilities</h3>
                    <ul>
                      {selectedJob.responsibilities.map((res, i) => (
                        <li key={i}>{res}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* Application Form View */
              <div className="application-form-view">
                <div className="modal-header">
                  <h2>Apply for {selectedJob.title}</h2>
                  <p>Fill out the form below and upload your CV.</p>
                </div>

                <form onSubmit={handleSubmitApplication} className="apply-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleFormChange} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleFormChange} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="linkedin">LinkedIn Profile Link</label>
                      <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleFormChange} placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="portfolio">Portfolio / Website Link</label>
                      <input type="url" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleFormChange} placeholder="https://yourwebsite.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Upload CV / Resume *</label>
                    <div 
                      className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={onButtonClick}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleChangeFile} 
                        style={{ display: 'none' }} 
                      />
                      
                      {cvFile ? (
                        <div className="file-preview">
                          <FaFileAlt className="file-icon" />
                          <div className="file-info">
                            <span className="file-name">{cvFile.name}</span>
                            <span className="file-size">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          <button type="button" className="remove-file-btn" onClick={(e) => { e.stopPropagation(); setCvFile(null); }}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="drag-drop-content">
                          <FaCloudUploadAlt className="upload-icon" />
                          <p>Drag & Drop your CV here</p>
                          <span className="or-text">or</span>
                          <span className="browse-text">Browse Files</span>
                          <p className="file-hint">Supported formats: PDF, DOC, DOCX</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="coverLetter">Cover Letter / Why should we hire you? *</label>
                    <textarea id="coverLetter" name="coverLetter" rows="4" required value={formData.coverLetter} onChange={handleFormChange}></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="back-btn" onClick={() => setIsApplying(false)}>Back to Details</button>
                    <button type="submit" className="submit-btn" disabled={appCounts[selectedJob.id] >= 100}>Submit Application</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerPage
