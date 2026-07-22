import type { Metadata } from 'next'
import Link from 'next/link'
import { brand, getSiteUrl, serviceAreas } from '@/data/brand'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/JsonLd'
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from '@/components/Icons'
import { phoneLink } from '@/lib/contact'
import { buildBreadcrumbList } from '@/seo/structuredData'

const site = getSiteUrl()
const cityList = serviceAreas.map((a) => a.name).join(', ')

const pageTitle = 'Service Areas — Everett HQ & Greater Boston'
const pageDescription = `LK Auto Care is based in Everett, MA and serves ${cityList}. Premium auto detailing, polishing, LED headlights, exhaust & engine remap near you.`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: serviceAreas.map(
    (a) => `auto detailing ${a.name} MA`,
  ),
  alternates: { canonical: '/areas' },
  openGraph: {
    title: `${pageTitle} | ${brand.name}`,
    description: pageDescription,
    url: `${site}/areas`,
    type: 'website',
    images: [
      {
        url: '/images/bg-challenger.jpg',
        width: 1280,
        height: 720,
        alt: 'LK Auto Care service areas — Everett and Greater Boston',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Service Areas | ${brand.name}`,
    description: pageDescription,
    images: ['/images/bg-challenger.jpg'],
  },
}

export default function AreasPage() {
  const tel = phoneLink()
  const structured = [
    buildBreadcrumbList([
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/areas' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${site}/areas#page`,
      name: `Service areas | ${brand.name}`,
      description: `${brand.name} serves ${cityList} and surrounding Greater Boston communities from ${brand.city}, ${brand.stateCode}.`,
      url: `${site}/areas`,
      isPartOf: { '@id': `${site}/#website` },
      about: { '@id': `${site}/#business` },
      mainEntity: {
        '@type': 'AutomotiveBusiness',
        '@id': `${site}/#business`,
        name: brand.name,
        areaServed: serviceAreas.map((a) => ({
          '@type': 'City',
          name: `${a.name}, MA`,
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
                  <li aria-current="page">Service areas</li>
                </ol>
              </nav>
              <div className="section-label">Areas we serve</div>
              <h1 className="page-title">
                Auto detailing near you —{' '}
                <span className="text-gradient">Everett HQ</span>
              </h1>
              <p className="section-lead">
                {brand.name} is headquartered in {brand.city}, Massachusetts,
                and works with drivers across Greater Boston. We expand this
                list as demand grows.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="areas-page-grid">
              {serviceAreas.map((area, i) => (
                <Reveal key={area.name} delay={i % 8}>
                  <article
                    className={`area-card ${area.primary ? 'primary' : ''}`}
                    id={area.name.toLowerCase().replace(/\s+/g, '-')}
                  >
                    <MapPinIcon size={20} />
                    <h2>{area.name}, MA</h2>
                    <p>
                      {area.primary
                        ? `Headquarters of ${brand.name}. Premium auto detailing, polishing, LED headlights, exhaust, and engine remap for local drivers in Everett and the surrounding metro.`
                        : `Auto detailing, polishing, LED headlights, exhaust, and engine remap serving ${area.name}, MA and nearby neighborhoods from our Everett base.`}
                    </p>
                    {area.primary ? (
                      <span className="area-badge">Headquarters</span>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="areas-seo-block">
              <h2>Local auto care across Greater Boston</h2>
              <p>
                Looking for auto detailing near you in Massachusetts?{' '}
                {brand.name} delivers interior and exterior detailing, paint
                polishing, LED headlight conversion, exhaust system replacement,
                and engine remap for clients in {cityList}. Based in{' '}
                {brand.city}, we are built for Boston-area roads and New England
                weather.
              </p>
              <div className="cta-banner-actions">
                {tel ? (
                  <a className="btn btn-primary" href={tel}>
                    <PhoneIcon size={16} />
                    Give us a call
                  </a>
                ) : null}
                <Link
                  className={tel ? 'btn btn-secondary' : 'btn btn-primary'}
                  href="/#contact"
                >
                  Request service in your city
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
