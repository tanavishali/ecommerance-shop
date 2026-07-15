import React, { useEffect } from 'react'
import { FaCalendarAlt, FaUserEdit, FaArrowRight, FaPaperPlane } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import './BlogPage.css'

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Software Development",
      excerpt: "Explore how Agentic AI and machine learning are revolutionizing the way we write, test, and deploy code in 2026.",
      category: "Artificial Intelligence",
      author: "Alex Morgan",
      date: "Oct 15, 2026",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "10 Next.js Performance Optimization Tips",
      excerpt: "Boost your web application's speed and SEO ranking with these advanced Next.js optimization techniques.",
      category: "Web Development",
      author: "Sarah Chen",
      date: "Oct 12, 2026",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Why Custom Software Beats Off-The-Shelf Solutions",
      excerpt: "An in-depth analysis of when your business should invest in custom software versus subscribing to a generic SaaS platform.",
      category: "Business Strategy",
      author: "David Miller",
      date: "Oct 08, 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Mastering Mobile App UX/UI in 2026",
      excerpt: "Learn the latest design trends and psychological principles to keep users engaged with your mobile application.",
      category: "Mobile Apps",
      author: "Emma Watson",
      date: "Oct 05, 2026",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Essential Technical SEO Audits for E-Commerce",
      excerpt: "Don't lose sales to poor search rankings. Here is our checklist for conducting a thorough technical SEO audit.",
      category: "SEO Optimization",
      author: "Chris Johnson",
      date: "Oct 01, 2026",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "The Ultimate Guide to WordPress Security",
      excerpt: "Protect your WordPress site from hackers, malware, and data breaches with our comprehensive security protocols.",
      category: "WordPress",
      author: "Lisa Ray",
      date: "Sep 28, 2026",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop"
    }
  ]

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content" data-aos="fade-up">
          <h1 className="blog-title">Insights & <span className="highlight">Innovations</span></h1>
          <p className="blog-subtitle">Stay ahead of the curve with our latest articles on software development, design trends, AI, and business strategy.</p>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="featured-post-section">
        <div className="featured-post-card" data-aos="fade-up" data-aos-delay="100">
          <div className="featured-img-container">
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop" alt="Featured Post" />
          </div>
          <div className="featured-content">
            <span className="post-category">Technology Trends</span>
            <h2 className="featured-title">Building Scalable Digital Architectures for the Modern Web</h2>
            <p className="featured-excerpt">As businesses grow, their digital infrastructure needs to adapt seamlessly. We break down the core principles of building highly scalable, resilient architectures that can handle millions of users without breaking a sweat.</p>
            
            <div className="post-meta">
              <div className="meta-item"><FaCalendarAlt /> Oct 20, 2026</div>
              <div className="meta-item"><FaUserEdit /> Tech Riwaayat Team</div>
            </div>
            
            <Link to="/blog/default" className="btn btn-primary" style={{marginTop: '24px', alignSelf: 'flex-start', textDecoration: 'none'}}>Read Article</Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="section-header" data-aos="fade-up">
          <h2>Latest Articles</h2>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article className="blog-card" key={post.id} data-aos="fade-up" data-aos-delay={index * 50}>
              <Link to={`/blog/${post.id}`} style={{textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div className="blog-img">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-card-content">
                  <span className="post-category">{post.category}</span>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  
                  <div className="post-meta" style={{marginBottom: '16px'}}>
                    <div className="meta-item"><FaCalendarAlt /> {post.date}</div>
                  </div>
                  
                  <span className="read-more">Read More <FaArrowRight /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container" data-aos="zoom-in">
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-subtitle">Get the latest tech news, tutorials, and insights delivered directly to your inbox every week.</p>
          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
            <button type="submit" className="newsletter-btn">Subscribe <FaPaperPlane style={{marginLeft: '8px'}} /></button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
