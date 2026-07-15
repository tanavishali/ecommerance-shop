import React, { useState } from 'react'
import { FaPaperPlane, FaEnvelopeOpenText } from 'react-icons/fa'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      // Production mein isko apne actual backend endpoint se connect karo
      const response = await fetch('/backend/newsletter.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: "Subscribed! Thanks for joining our newsletter." })
        setEmail('')
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      // Local dev fallback jab backend nahi chal raha
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setStatus({ type: 'success', message: 'Local Test Success! Subscribed.' })
        setEmail('')
      } else {
        setStatus({ type: 'error', message: 'Network error. Please try again later.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="hnl-section">
      <div className="hnl-container" data-aos="fade-up">
        <div className="hnl-icon-wrapper">
          <FaEnvelopeOpenText />
        </div>

        <h2 className="hnl-title">
          Stay Updated with <span className="highlight">Tech Riwaayat</span>
        </h2>
        <p className="hnl-desc">
          Subscribe to get the latest tech insights, project updates, and exclusive offers straight to your inbox.
        </p>

        <form className="hnl-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="hnl-input"
          />
          <button type="submit" className="hnl-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'} {!isSubmitting && <FaPaperPlane />}
          </button>
        </form>

        {status.message && (
          <p className={`hnl-status ${status.type}`}>{status.message}</p>
        )}

        <p className="hnl-note">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

export default Newsletter
