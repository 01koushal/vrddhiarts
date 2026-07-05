import { Mail, MapPin, Phone } from 'lucide-react'
import InstagramIcon from '../components/ui/InstagramIcon'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import { siteConfig } from '../config/siteConfig'

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section className="section page-section">
      <div className="container contact-grid">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Begin a custom resin artwork"
            text="Share the product type, occasion, quantity, and any personalization details."
          />
          <div className="contact-list">
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
              <InstagramIcon size={18} /> Contact on Instagram
            </a>
            <a href={`mailto:${siteConfig.email}`}><Mail size={18} /> {siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone}`}><Phone size={18} /> {siteConfig.phone}</a>
            <span><MapPin size={18} /> {siteConfig.address}</span>
          </div>
          <div className="hours-box">
            <h3>Business Hours</h3>
            {siteConfig.businessHours.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea name="message" rows="6" placeholder="Tell us about your custom order" />
          </label>
          <Button type="submit">Send Enquiry</Button>
        </form>

        <div className="map-placeholder">
          <MapPin size={28} />
          <span>Google Maps placeholder</span>
        </div>
      </div>
    </section>
  )
}

export default Contact

