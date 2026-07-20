'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { brand } from '@/data/brand'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`)

  const goHomeTop = () => {
    closeMenu()
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header
        className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
      >
        <div className="container header-inner">
          <Link
            href="/"
            className="logo"
            onClick={goHomeTop}
            aria-label={`${brand.name} — home`}
          >
            <Image
              src="/images/logo.png"
              alt=""
              className="logo-img"
              width={44}
              height={44}
              priority
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
            <Link
              href="/services"
              className={pathname === '/services' ? 'active' : undefined}
            >
              All services
            </Link>
            <a href={sectionHref('#faq')}>FAQ</a>
            <a href={sectionHref('#contact')}>Contact</a>
          </nav>

          <a className="btn btn-primary header-cta" href={sectionHref('#contact')}>
            Book now
          </a>

          <button
            type="button"
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
            <Link href="/services" onClick={closeMenu}>
              All services
            </Link>
            <Link href="/areas" onClick={closeMenu}>
              Areas we serve
            </Link>
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
    </>
  )
}
