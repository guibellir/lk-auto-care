import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { brand } from '../data/brand'
import { emailLink, instagramUrl, phoneLink } from '../lib/contact'
import { InstagramIcon, MailIcon, PhoneIcon } from './Icons'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const isHome = location.pathname === '/'

  const goHomeTop = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu()
    if (isHome) {
      event.preventDefault()
      if (location.hash) navigate('/', { replace: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`)
  const tel = phoneLink()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="container header-inner">
          <Link
            to="/"
            className="logo"
            onClick={goHomeTop}
            aria-label={`${brand.name} — home`}
          >
            <img
              src="/images/logo.png"
              alt=""
              className="logo-img"
              width={44}
              height={44}
            />
            <span className="logo-text">
              <strong>LK</strong>
              <span>Auto Care</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <a href={sectionHref('#services')}>Services</a>
            <a href={sectionHref('#process')}>How it works</a>
            <a href={sectionHref('#areas')}>Areas</a>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              All services
            </NavLink>
            <a href={sectionHref('#faq')}>FAQ</a>
            <a href={sectionHref('#contact')}>Contact</a>
          </nav>

          <a className="btn btn-primary header-cta" href={sectionHref('#contact')}>
            Book now
          </a>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <div className="container mobile-nav-inner">
            <a href={sectionHref('#services')} onClick={closeMenu}>
              Services
            </a>
            <a href={sectionHref('#process')} onClick={closeMenu}>
              How it works
            </a>
            <a href={sectionHref('#areas')} onClick={closeMenu}>
              Service areas
            </a>
            <NavLink to="/services" onClick={closeMenu}>
              All services
            </NavLink>
            <NavLink to="/areas" onClick={closeMenu}>
              Areas we serve
            </NavLink>
            <a href={sectionHref('#faq')} onClick={closeMenu}>
              FAQ
            </a>
            <a
              className="btn btn-primary"
              href={sectionHref('#contact')}
              onClick={closeMenu}
            >
              Book now
            </a>
          </div>
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="footer-glow" aria-hidden="true" />
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link" onClick={goHomeTop}>
              <img
                src="/images/logo.png"
                alt={`${brand.name} logo`}
                className="footer-logo"
                width={64}
                height={64}
              />
              <div>
                <strong>{brand.name}</strong>
                <span>
                  {brand.tagline} · Est. {brand.established}
                </span>
              </div>
            </Link>
            <p>
              Premium auto detailing, polishing, LED headlights, exhaust
              replacement, and engine remap based in {brand.city},{' '}
              {brand.stateCode} — serving Greater Boston.
            </p>
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <a href={sectionHref('#services')}>Services</a>
            <a href={sectionHref('#process')}>How it works</a>
            <a href={sectionHref('#areas')}>Areas</a>
            <a href={sectionHref('#faq')}>FAQ</a>
            <NavLink to="/services">Service details</NavLink>
            <NavLink to="/areas">Cities we serve</NavLink>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <a href={sectionHref('#services')}>Auto detailing</a>
            <a href={sectionHref('#services')}>Polishing</a>
            <a href={sectionHref('#services')}>LED headlights</a>
            <a href={sectionHref('#services')}>Exhaust</a>
            <a href={sectionHref('#services')}>Engine remap</a>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <p className="footer-location">
              {brand.city}, {brand.stateCode}
            </p>
            {tel ? (
              <a href={tel}>
                <PhoneIcon size={16} /> {brand.phoneDisplay || brand.phone}
              </a>
            ) : null}
            <a href={emailLink()}>
              <MailIcon size={16} /> {brand.email}
            </a>
            <a
              href={instagramUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon size={16} /> @{brand.instagram}
            </a>
            <a className="btn btn-secondary footer-cta" href={sectionHref('#contact')}>
              Request a quote
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
            Premium auto care in {brand.city}, {brand.state}.
          </p>
          <p className="footer-seo-line">
            Auto detailing · Polishing · LED headlights · Exhaust · Engine remap
            · Everett MA · Greater Boston
          </p>
        </div>
      </footer>
    </>
  )
}
