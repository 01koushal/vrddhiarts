import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import InstagramIcon from '../ui/InstagramIcon'
import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Collections', to: '/collections' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <img src="/logo/logo.png" alt={`${siteConfig.businessName} logo`} />
        </Link>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <a className="icon-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon size={18} />
          </a>
        </div>

        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mobile-drawer">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            Contact on Instagram
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar

