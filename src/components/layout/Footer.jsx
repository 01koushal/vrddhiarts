import InstagramIcon from '../ui/InstagramIcon'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'
import MailIcon from '../ui/MailIcon'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content-centered">
        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/about">About</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/gallery">Gallery</Link>
        </div>

        <div className="footer-column">
          <h3>Policies</h3>
          <Link to="/policies">Policies</Link>
        </div>

        <div className="footer-column">
          <h3>Social</h3>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="footer-social-link">
            <InstagramIcon size={16} /> Contact on Instagram
          </a>
          <a href={`mailto:${siteConfig.email}`} className="footer-social-link">
            <MailIcon size={16} /> Contact via Email
          </a>

          {siteConfig.businessHours.map((line) => (
            <span key={line} className="footer-hours-line">{line}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
