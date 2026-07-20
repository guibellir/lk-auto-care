import type { Metadata } from 'next'
import Link from 'next/link'
import { brand, getSiteUrl, services } from '@/data/brand'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/JsonLd'
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  serviceIcon,
} from '@/components/Icons'
import { phoneLink } from '@/lib/contact'

const site = getSiteUrl()

export const metadata: Metadata = {
  title: 'Services — Detailing, Polish, LED, Exhaust, Remap',
  description:
    'Explore LK Auto Care services in Everett, MA: interior & exterior detailing, paint polishing, LED headlight conversion, exhaust replacement, and engine remap for Greater Boston.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | LK Auto Care',
    description:
      'Detailing, polishing, LED headlights, exhaust replacement, and engine remap in Everett, MA.',
    url: `${site}/services`,
  },
}

export default function ServicesPage() {
  const tel = phoneLink()
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Auto care services | ${brand.name}`,
    description:
      'Interior & exterior detailing, polishing, LED headlights, exhaust replacement, and engine remap in Everett, MA.',
    url: `${site}/services`,
    isPartOf: { '@id': `${site}/#website` },
    about: services.map((s) => ({
      '@type': 'Service',
      name: s.name,
      description: s.longDescription,
      provider: { '@id': `${site}/#business` },
    })),
  }

  return (
    <>
      <JsonLd data={structured} />
      <main id="main" className="page-main">
        <section className="page-hero">
          <div className="container">
            <Reveal>
              <div className="section-label">Services</div>
              <h1 className="page-title">
                Premium services for{' '}
                <span className="text-gradient">every mile</span>
              </h1>
              <p className="section-lead">
                Five focused offerings from {brand.name} in {brand.city},{' '}
                {brand.stateCode} — appearance, light, sound, and response under
                one premium standard.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section page-services">
          <div className="container service-detail-list">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index} className="service-detail">
                <article>
                  <div className="service-detail-icon">
                    {serviceIcon(service.icon, 32)}
                  </div>
                  <div className="service-detail-body">
                    <h2>{service.name}</h2>
                    <p className="service-detail-lead">
                      {service.longDescription}
                    </p>
                    <ul className="service-highlights">
                      {service.highlights.map((h) => (
                        <li key={h}>
                          <CheckIcon size={14} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <p className="service-seo-line">{service.seoKeywords}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container cta-banner">
            <Reveal className="cta-banner-inner">
              <div>
                <h2>Ready to book?</h2>
                <p>
                  Give us a call or send a message with your vehicle and city —
                  we&apos;ll recommend the right service path.
                </p>
              </div>
              <div className="cta-banner-actions">
                {tel ? (
                  <a className="btn btn-primary btn-lg" href={tel}>
                    <PhoneIcon size={18} />
                    Give us a call
                  </a>
                ) : null}
                <Link
                  className={
                    tel ? 'btn btn-secondary btn-lg' : 'btn btn-primary btn-lg'
                  }
                  href="/#contact"
                >
                  Send a message
                  <ArrowRightIcon size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
