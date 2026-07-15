import React from 'react'
import Hero from '../components/Hero'
import Clients from '../components/Clients'
import Services from '../components/Services'
import Industries from '../components/Industries'
import About from '../components/About'
import TechStack from '../components/TechStack'
import CTA from '../components/CTA'
import Process from '../components/Process'
import TeamPreview from '../components/TeamPreview'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Clients />
      <Services />
      <Industries />
      <About />
      <TechStack />
      <CTA />
      <Process />
      <TeamPreview />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  )
}

export default Home
