'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { brand } from '@/data/brand'
import { phoneLink } from '@/lib/contact'
import { PhoneIcon } from '@/components/Icons'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const tel = phoneLink()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // iOS Safari: overflow:hidden alone does not lock body scroll
  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const { style } = document.body
    const prev = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      overflow: style.overflow,
      width: style.width,
    }

    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.overflow = 'hidden'
    style.width = '100%'

    return () => {
      style.position = prev.position
      style.top = prev.top
      style.left = prev.left
      style.right = prev.right
      style.overflow = prev.overflow
      style.width = prev.width
      window.scrollTo(0, scrollY)
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

  const toggleMenu = () => setMenuOpen((v) => !v)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header
        className={`header ${scrolled || menuOpen ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
      >
        <div className="container header-inner">
          <Link
            href="/"
            className="logo"
            onClick={goHomeTop}
            aria-label={`${brand.name} — home`}
          >
            <Image
              src="/images/logo-256.png"
              alt=""
              className="logo-img"
              width={44}
              height={44}
              sizes="44px"
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
            aria-controls="mobile-nav"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/*
        Outside <header>: backdrop-filter / sticky on header create a
        containing block that collapses position:fixed children on iOS Safari.
      */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
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
          <a href={sectionHref('#contact')} onClick={closeMenu}>
            Contact
          </a>
          <div className="mobile-nav-actions">
            {tel ? (
              <a className="btn btn-primary" href={tel} onClick={closeMenu}>
                <PhoneIcon size={18} />
                Call {brand.phoneDisplay || brand.phone}
              </a>
            ) : null}
            <a
              className={`btn ${tel ? 'btn-ghost' : 'btn-primary'}`}
              href={sectionHref('#contact')}
              onClick={closeMenu}
            >
              Book now
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
