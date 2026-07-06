import { Mail, MapPin, Phone } from 'lucide-react'
import InstagramIcon from '../ui/InstagramIcon'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo/logo.png" alt={`${siteConfig.businessName} logo`} />
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/about">About</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Contact</h3>
          
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={16} /> {siteConfig.email}
          </a>
          <span>
            <MapPin size={16} /> {siteConfig.address}
          </span>
        </div>

        <div>
          <h3>Social</h3>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon size={16} /> Contact on Instagram
          </a>
          {siteConfig.businessHours.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
      </footer>
  )
}

export default Footer


