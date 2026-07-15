import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import CareerPage from './pages/CareerPage'
import CompanyPage from './pages/CompanyPage'
import WebDevelopmentPage from './pages/WebDevelopmentPage'
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage'
import ECommerceDevelopmentPage from './pages/ECommerceDevelopmentPage'
import AiAutomationPage from './pages/AiAutomationPage'
import CustomSoftwarePage from './pages/CustomSoftwarePage'
import SeoOptimizationPage from './pages/SeoOptimizationPage'
import WordpressDevelopmentPage from './pages/WordpressDevelopmentPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/services/web-development" element={<WebDevelopmentPage />} />
          <Route path="/services/mobile-app-development" element={<MobileAppDevelopmentPage />} />
          <Route path="/services/e-commerce-development" element={<ECommerceDevelopmentPage />} />
          <Route path="/services/ai-automation" element={<AiAutomationPage />} />
          <Route path="/services/custom-software" element={<CustomSoftwarePage />} />
          <Route path="/services/seo-optimization" element={<SeoOptimizationPage />} />
          <Route path="/services/wordpress-development" element={<WordpressDevelopmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
