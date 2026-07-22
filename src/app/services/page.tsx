import type { Metadata } from 'next'
import Link from 'next/link'
import { brand, getSiteUrl, services } from '@/data/brand'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/JsonLd'
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  WhatsAppIcon,
  serviceIcon,
} from '@/components/Icons'
import { phoneLink, whatsappLink } from '@/lib/contact'
import { buildBreadcrumbList } from '@/seo/structuredData'

const site = getSiteUrl()

const pageTitle = 'Services — Detailing, Polish, LED, Exhaust & Remap'
const pageDescription =
  'Explore LK Auto Care services in Everett, MA: interior & exterior detailing, paint polishing, LED headlight conversion, exhaust replacement, and engine remap for Greater Boston.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'auto detailing services Everett MA',
    'paint polishing Boston',
    'LED headlight conversion Massachusetts',
    'exhaust replacement Greater Boston',
    'engine remap Everett',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: `${pageTitle} | ${brand.name}`,
    description: pageDescription,
    url: `${site}/services`,
    type: 'website',
    images: [
      {
        url: '/images/bg-challenger.jpg',
        width: 1280,
        height: 720,
        alt: 'LK Auto Care services — premium auto care Everett MA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Services | ${brand.name}`,
    description: pageDescription,
    images: ['/images/bg-challenger.jpg'],
  },
}

export default function ServicesPage() {
  const tel = phoneLink()
  const wa = whatsappLink()
  const structured = [
    buildBreadcrumbList([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${site}/services#page`,
      name: `Auto care services | ${brand.name}`,
      description: pageDescription,
      url: `${site}/services`,
      isPartOf: { '@id': `${site}/#website` },
      about: { '@id': `${site}/#business` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${site}/services#${s.id}`,
          name: s.name,
          item: {
            '@type': 'Service',
            '@id': `${site}/services#${s.id}`,
            name: s.name,
            description: s.longDescription,
            provider: { '@id': `${site}/#business` },
            areaServed: `${brand.city}, ${brand.stateCode}`,
          },
        })),
      },
    },
  ]

  return (
    <>
      <JsonLd data={structured} />
      <main id="main" className="page-main">
        <section className="page-hero">
          <div className="container">
            <Reveal>
              <nav className="page-breadcrumbs" aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-current="page">Services</li>
                </ol>
              </nav>
              <div className="section-label">Services</div>
              <h1 className="page-title">
                Premium auto services in{' '}
                <span className="text-gradient">Everett, MA</span>
              </h1>
              <p className="section-lead">
                Five focused offerings from {brand.name} — appearance, light,
                sound, and response under one premium standard for drivers
                across Greater Boston.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section page-services">
          <div className="container service-detail-list">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index} className="service-detail">
                <article id={service.id}>
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
                <h2>Ready to book in {brand.city}?</h2>
                <p>
                  Call, text, or send a message with your vehicle and city —
                  we&apos;ll recommend the right service path for Greater Boston
                  roads.
                </p>
              </div>
              <div className="cta-banner-actions">
                {tel ? (
                  <a className="btn btn-primary btn-lg" href={tel}>
                    <PhoneIcon size={18} />
                    Give us a call
                  </a>
                ) : null}
                {wa ? (
                  <a
                    className="btn btn-whatsapp btn-lg"
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={18} />
                    WhatsApp
                  </a>
                ) : null}
                <Link
                  className={
                    tel || wa
                      ? 'btn btn-secondary btn-lg'
                      : 'btn btn-primary btn-lg'
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
