import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import mudassarImg from '../assets/mudassar.jpg'
import farhanImg from '../assets/farhan.jpeg'
import maryamImg from '../assets/maryam.jpg'
import shahzaibImg from '../assets/shahzaib.jpeg'
import './TeamPreview.css'

// Home page pe sirf 4 members dikhate hain, poori team /team page par hai
const previewMembers = [
  {
    id: 1,
    name: 'Mudassar Latif',
    role: 'CEO & Founder',
    image: mudassarImg,
    fallbackImage: 'https://ui-avatars.com/api/?name=Mudassar+Latif&background=00d97e&color=fff&size=200'
  },
  {
    id: 2,
    name: 'Farhan Amjad',
    role: 'Frontend Developer',
    image: farhanImg,
    fallbackImage: 'https://ui-avatars.com/api/?name=Farhan+Amjad&background=00d97e&color=fff&size=200'
  },
  {
    id: 3,
    name: 'Maryam Islam',
    role: 'SEO Specialist',
    image: maryamImg,
    fallbackImage: 'https://ui-avatars.com/api/?name=Maryam+Islam&background=00d97e&color=fff&size=200'
  },
  {
    id: 4,
    name: 'Shahzaib Asif',
    role: 'Junior Full Stack Developer',
    image: shahzaibImg,
    fallbackImage: 'https://ui-avatars.com/api/?name=Shahzaib+Asif&background=00d97e&color=fff&size=200'
  }
]

const TeamPreview = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.clientWidth / 2
    let closestIndex = 0
    let minDist = Infinity
    Array.from(el.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(containerCenter - childCenter)
      if (dist < minDist) {
        minDist = dist
        closestIndex = i
      }
    })
    setActiveIndex(closestIndex)
  }

  const scrollToIndex = (index) => {
    const el = scrollRef.current
    const child = el?.children[index]
    if (!el || !child) return
    const targetLeft = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2
    el.scrollTo({ left: targetLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="team-preview" className="team-preview-section">
      <div className="team-preview-container">
        <div className="team-preview-header" data-aos="fade-up">
          <span className="team-preview-label">OUR EXPERTS</span>
          <h2 className="team-preview-title">
            Meet the People Behind <span className="highlight">Tech Riwaayat</span>
          </h2>
          <p className="team-preview-desc">
            A passionate team of developers, designers, and strategists working together to build your success.
          </p>
        </div>

        <div className="team-preview-grid" ref={scrollRef}>
          {previewMembers.map((member, index) => (
            <div
              className="tpv-card"
              key={member.id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <div className="tpv-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="tpv-image"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = member.fallbackImage
                  }}
                />
              </div>
              <h3 className="tpv-name">{member.name}</h3>
              <p className="tpv-role">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="team-preview-dots">
          {previewMembers.map((member, index) => (
            <button
              key={member.id}
              className={`tpv-dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to ${member.name}`}
            />
          ))}
        </div>

        <div className="team-preview-cta" data-aos="fade-up">
          <Link to="/team" className="team-preview-btn">
            Meet the Full Team <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TeamPreview
