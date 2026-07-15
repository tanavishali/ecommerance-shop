import React from 'react'
import './Clients.css'

// 👉 Apni client/partner logos "public/clients/" folder mein rakho
// aur neeche is array mein filename + naam add/edit karo.
// Agar image na mile to automatically company ka naam bade text mein show ho jayega.
const clientLogos = [
  { name: 'Client One', file: '/clients/client-1.png' },
  { name: 'Client Two', file: '/clients/client-2.png' },
  { name: 'Client Three', file: '/clients/client-3.png' },
  { name: 'Client Four', file: '/clients/client-4.png' },
  { name: 'Client Five', file: '/clients/client-5.png' },
  { name: 'Client Six', file: '/clients/client-6.png' },
]

const LogoItem = ({ client }) => (
  <div className="client-logo-item">
    <img
      src={client.file}
      alt={client.name}
      className="client-logo-img"
      onError={(e) => {
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
      }}
    />
    <span className="client-logo-fallback">{client.name}</span>
  </div>
)

const Clients = () => {
  // Seamless loop ke liye list ko do baar render karte hain
  const loopLogos = [...clientLogos, ...clientLogos]

  return (
    <section id="clients" className="clients-section">
      <div className="clients-container">
        <span className="clients-label">TRUSTED BY</span>
        <h2 className="clients-title">
          Companies We've <span className="highlight">Worked With</span>
        </h2>
      </div>

      <div className="clients-marquee-wrapper">
        <div className="clients-marquee-track">
          {loopLogos.map((client, index) => (
            <LogoItem client={client} key={`${client.name}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
