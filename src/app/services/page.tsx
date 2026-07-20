import type { Metadata } from 'next'
import Link from 'next/link'
import { brand, getSiteUrl, services } from '@/data/brand'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/JsonLd'
import { ArrowRightIcon } from '@/components/Icons'

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
                Scope of work
              </h1>
              <p className="section-lead">
                Five focused offerings from {brand.name} in {brand.city},{' '}
                {brand.stateCode}. Clear descriptions — no filler packages.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section page-services">
          <div className="container">
            <div className="service-index">
              {services.map((service, index) => (
                <Reveal key={service.id} delay={index} className="service-row-wrap">
                  <article className="service-detail-row">
                    <span className="service-index-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="service-detail-body">
                      <h2>{service.name}</h2>
                      <p className="service-detail-lead">
                        {service.longDescription}
                      </p>
                      <ul className="service-row-points service-detail-points">
                        {service.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container cta-banner">
            <Reveal className="cta-banner-inner">
              <div>
                <h2>Ready to book?</h2>
                <p>
                  Tell us your vehicle and city — we&apos;ll recommend the right
                  path.
                </p>
              </div>
              <Link className="btn btn-primary btn-lg" href="/#contact">
                Contact us
                <ArrowRightIcon size={18} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
