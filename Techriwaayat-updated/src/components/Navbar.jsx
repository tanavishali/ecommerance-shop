import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaBuilding, FaBlog, FaComments, FaBolt, FaPhone, FaChevronDown, FaUser, FaUsers, FaBriefcase, FaGlobe, FaWordpress, FaSearch, FaCode, FaRobot, FaShoppingCart, FaMobileAlt, FaLaptopCode, FaCogs } from 'react-icons/fa'
import logoImg from '../assets/tech-riwaayat.png'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // null | 'company' | 'services'
  const companyRef = useRef(null)
  const servicesRef = useRef(null)
  const navRef = useRef(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setActiveDropdown(null)
    }
  }

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  // Close dropdown when clicking a dropdown link
  const handleDropdownLinkClick = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (companyRef.current && companyRef.current.contains(event.target)) ||
        (servicesRef.current && servicesRef.current.contains(event.target))
      ) {
        return; // Clicked inside a dropdown, do nothing
      }
      setActiveDropdown(null)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDropdownHover = (dropdownName, state) => {
    // Only open/close on hover for desktop
    if (window.innerWidth > 768) {
      setActiveDropdown(state ? dropdownName : null)
    }
  }

  const handleDropdownClick = (e, dropdownName) => {
    e.preventDefault()
    // Toggle on click for mobile
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
    }
  }

  // Handle close icon click separately
  const handleCloseClick = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logoImg} alt="Tech Riwaayat Logo" style={{ height: '80px', width: 'auto', transform: 'scale(1.8)', transformOrigin: 'left center' }} />
          </Link>
        </div>

        {/* Menu Toggle for Mobile */}
        <div 
          className={`menu-toggle ${isOpen ? 'active' : ''}`} 
          onClick={() => isOpen ? handleCloseClick() : toggleMenu()}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links - Centered */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLinkClick}>
              <FaHome className="nav-icon" />
              Home
            </Link>
          </li>
          
          {/* Company Dropdown */}
          <li 
            className="nav-item dropdown-item" 
            ref={companyRef}
            onMouseEnter={() => handleDropdownHover('company', true)}
            onMouseLeave={() => handleDropdownHover('company', false)}
          >
            <button 
              className="nav-link dropdown-toggle" 
              onClick={(e) => handleDropdownClick(e, 'company')}
            >
              <FaBuilding className="nav-icon" />
              Company
              <FaChevronDown className="dropdown-arrow" />
            </button>
            <ul className={`dropdown-menu ${activeDropdown === 'company' ? 'active' : ''}`}>
              <li>
                <Link to="/about" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaUser className="dropdown-icon" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/team" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaUsers className="dropdown-icon" />
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/career" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaBriefcase className="dropdown-icon" />
                  Career
                </Link>
              </li>
              <li>
                <Link to="/company" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaGlobe className="dropdown-icon" />
                  Company
                </Link>
              </li>
            </ul>
          </li>

          {/* Services Dropdown */}
          <li 
            className="nav-item dropdown-item" 
            ref={servicesRef}
            onMouseEnter={() => handleDropdownHover('services', true)}
            onMouseLeave={() => handleDropdownHover('services', false)}
          >
            <button 
              className="nav-link dropdown-toggle" 
              onClick={(e) => handleDropdownClick(e, 'services')}
            >
              <FaCogs className="nav-icon" />
              Services
              <FaChevronDown className="dropdown-arrow" />
            </button>
            <ul className={`dropdown-menu ${activeDropdown === 'services' ? 'active' : ''}`}>
              <li>
                <Link to="/services/wordpress-development" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaWordpress className="dropdown-icon" />
                  WordPress Development
                </Link>
              </li>
              <li>
                <Link to="/services/seo-optimization" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaSearch className="dropdown-icon" />
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/custom-software" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaLaptopCode className="dropdown-icon" />
                  Custom Software
                </Link>
              </li>
              <li>
                <Link to="/services/ai-automation" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaRobot className="dropdown-icon" />
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link to="/services/e-commerce-development" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaShoppingCart className="dropdown-icon" />
                  E-Commerce Development
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-app-development" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaMobileAlt className="dropdown-icon" />
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="dropdown-link" onClick={handleDropdownLinkClick}>
                  <FaLaptopCode className="dropdown-icon" />
                  Web Design & Development
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/blog" className="nav-link" onClick={handleLinkClick}>
              <FaBlog className="nav-icon" />
              Blog
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={handleLinkClick}>
              <FaComments className="nav-icon" />
              Contact
            </Link>
          </li>

          {/* Mobile Schedule Button */}
          <li className="nav-item mobile-schedule">
            <Link to="/contact" className="schedule-btn-mobile" onClick={handleLinkClick}>
              <FaPhone className="btn-icon" />
              Schedule a Call
            </Link>
          </li>

        </ul>

        {/* Schedule Call Button - Desktop Only */}
        <Link to="/contact" className="schedule-btn desktop-schedule" onClick={handleLinkClick}>
          <FaPhone className="btn-icon" />
          Schedule a Call
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
