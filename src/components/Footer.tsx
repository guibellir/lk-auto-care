import Image from 'next/image'
import Link from 'next/link'
import { brand } from '@/data/brand'
import { emailLink, instagramUrl, phoneLink } from '@/lib/contact'
import { InstagramIcon, MailIcon, PhoneIcon } from '@/components/Icons'

export function Footer() {
  const tel = phoneLink()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo-link">
            <Image
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
          <Link href="/#services">Services</Link>
          <Link href="/#process">How it works</Link>
          <Link href="/#areas">Areas</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/services">Service details</Link>
          <Link href="/areas">Cities we serve</Link>
        </div>

        <div className="footer-col">
          <h3>Services</h3>
          <Link href="/#services">Auto detailing</Link>
          <Link href="/#services">Polishing</Link>
          <Link href="/#services">LED headlights</Link>
          <Link href="/#services">Exhaust</Link>
          <Link href="/#services">Engine remap</Link>
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
          <a href={instagramUrl()} target="_blank" rel="noreferrer">
            <InstagramIcon size={16} /> @{brand.instagram}
          </a>
          <Link className="btn btn-secondary footer-cta" href="/#contact">
            Request a quote
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {brand.legalName}. All rights reserved. Premium auto care in{' '}
          {brand.city}, {brand.state}.
        </p>
        <p className="footer-seo-line">
          Auto detailing · Polishing · LED headlights · Exhaust · Engine remap ·
          Everett MA · Greater Boston
        </p>
      </div>
    </footer>
  )
}
