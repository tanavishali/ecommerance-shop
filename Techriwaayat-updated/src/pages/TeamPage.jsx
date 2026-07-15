import React, { useEffect, useRef, useState } from 'react'
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa'
import mudassarImg from '../assets/mudassar.jpg'
import farhanImg from '../assets/farhan.jpeg'
import shahzadImg from '../assets/shahzad.jpg'
import maryamImg from '../assets/maryam.jpg'
import rimshaImg from '../assets/rimsha.jpeg'
import shahzaibImg from '../assets/shahzaib.jpeg'
import huzaifaImg from '../assets/Huzaifa Abdulrehman.jpg'
import './TeamPage.css'
import AOS from 'aos'

// Public-folder images (no import) ke liye: agar file .jpg na mile to
// khud b khud .jpeg, .png, .JPG, .PNG try karta hai, phir avatar pe fallback
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG', 'webp']

const TeamImage = ({ basePath, alt, fallbackImage, className }) => {
  const [attempt, setAttempt] = useState(0)
  const src = attempt < EXTENSIONS.length ? `${basePath}.${EXTENSIONS[attempt]}` : fallbackImage

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setAttempt((prev) => (prev < EXTENSIONS.length ? prev + 1 : prev))
      }}
    />
  )
}

const TeamPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [])

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const child = scrollRef.current.children[0];
      const gap = 40; // match CSS gap
      const itemWidth = child.offsetWidth + gap;
      // Determine index based on scroll position
      const newIndex = Math.max(0, Math.min(teamMembers.length - 1, Math.round(scrollLeft / itemWidth)));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToItem = (index) => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const child = scrollRef.current.children[0];
      const gap = 40;
      const itemWidth = child.offsetWidth + gap;
      scrollRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const teamMembers = [
    {
      id: 1,
      name: "Mudassar Latif",
      role: "CEO & Founder",
      image: mudassarImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Mudassar+Latif&background=00d97e&color=fff&size=200"
    },
    {
      id: 2,
      name: "Tanawish Ali",
      role: "HR Manager",
      imageBase: "/team/tanawish",
      fallbackImage: "https://ui-avatars.com/api/?name=Tanawish+Ali&background=1a1a1a&color=00d97e&size=200"
    },
    {
      id: 3,
      name: "Farhan Amjad",
      role: "Frontend Developer",
      image: farhanImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Farhan+Amjad&background=00d97e&color=fff&size=200"
    },
    {
      id: 4,
      name: "Shahzad",
      role: "Data Scientist",
      image: shahzadImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Shahzad&background=1a1a1a&color=00d97e&size=200"
    },
    {
      id: 5,
      name: "Maryam Islam",
      role: "SEO Specialist",
      image: maryamImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Maryam+Islam&background=00d97e&color=fff&size=200"
    },
    {
      id: 6,
      name: "Rimsha Noor",
      role: "WordPress Developer",
      image: rimshaImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Rimsha+Noor&background=1a1a1a&color=00d97e&size=200"
    },
    {
      id: 7,
      name: "Shahzaib Asif",
      role: "Junior Full Stack Developer",
      image: shahzaibImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Shahzaib+Asif&background=00d97e&color=fff&size=200"
    },
    {
      id: 8,
      name: "Huzaifa Abdulraham",
      role: "DevOps Engineer",
      image: huzaifaImg,
      fallbackImage: "https://ui-avatars.com/api/?name=Huzaifa+Abdulraham&background=1a1a1a&color=00d97e&size=200"
    },
    {
      id: 9,
      name: "Umer",
      role: "SEO Specialist",
      imageBase: "/team/umer",
      fallbackImage: "https://ui-avatars.com/api/?name=Umer&background=00d97e&color=fff&size=200"
    }
  ]

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero" data-aos="fade-up">
        <div className="team-hero-container">
          <span className="team-badge">OUR EXPERTS</span>
          <h1 className="team-main-title">Meet the <span className="highlight">Team</span></h1>
          <p className="team-hero-desc">
            We are a team of passionate developers, designers, and strategists dedicated to delivering exceptional digital experiences. Together, we turn complex problems into elegant solutions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="tp-content">
        <div className="tp-container">
          
          <div className="tp-grid" ref={scrollRef} onScroll={handleScroll}>
            {teamMembers.map((member, index) => (
              <div 
                className="tp-card" 
                key={member.id} 
                data-aos="zoom-in-up" 
                data-aos-delay={index * 100}
              >
                <div className="tp-image-wrapper">
                  {member.imageBase ? (
                    <TeamImage
                      basePath={member.imageBase}
                      alt={member.name}
                      fallbackImage={member.fallbackImage}
                      className="tp-image"
                    />
                  ) : (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="tp-image" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = member.fallbackImage;
                      }}
                    />
                  )}
                </div>
                <div className="tp-details">
                  <h3 className="tp-name">{member.name}</h3>
                  <p className="tp-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tp-pagination">
            {teamMembers.map((_, index) => (
              <button 
                key={index} 
                className={`tp-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => scrollToItem(index)}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}

export default TeamPage
