import { Link } from 'react-router-dom'
import { brand, serviceAreas } from '../data/brand'
import { Seo, JsonLd } from '../components/Seo'
import { Reveal } from '../components/Reveal'
import { ArrowRightIcon, MapPinIcon } from '../components/Icons'
import { getSiteUrl } from '../data/brand'

export function AreasPage() {
  const site = getSiteUrl()
  const cityList = serviceAreas.map((a) => a.name).join(', ')

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Service areas | ${brand.name}`,
    description: `${brand.name} serves ${cityList} and surrounding Greater Boston communities from ${brand.city}, ${brand.stateCode}.`,
    url: `${site}/areas`,
    about: {
      '@type': 'AutomotiveBusiness',
      name: brand.name,
      areaServed: serviceAreas.map((a) => ({
        '@type': 'City',
        name: `${a.name}, MA`,
      })),
    },
  }

  return (
    <>
      <Seo
        title="Service Areas | LK Auto Care — Everett & Greater Boston"
        description={`LK Auto Care is based in Everett, MA and serves ${cityList}. Premium auto detailing, polishing, LED headlights, exhaust & engine remap near you.`}
        path="/areas"
      />
      <JsonLd data={structured} />

      <main id="main" className="page-main">
        <section className="page-hero">
          <div className="container">
            <Reveal>
              <div className="section-label">Areas we serve</div>
              <h1 className="page-title">
                Everett base.{' '}
                <span className="text-gradient">Metro reach.</span>
              </h1>
              <p className="section-lead">
                {brand.name} is based in {brand.city}, Massachusetts, and works
                with drivers across the surrounding cities. We expand this list
                as demand grows.
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
                  >
                    <MapPinIcon size={20} />
                    <h2>{area.name}, MA</h2>
                    <p>
                      {area.primary
                        ? `Home base of ${brand.name}. Premium auto detailing and upgrades for local drivers.`
                        : `Auto detailing, polishing, LED headlights, exhaust, and engine remap serving ${area.name} and nearby neighborhoods.`}
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
              <Link className="btn btn-primary" to="/#contact">
                Request service in your city
                <ArrowRightIcon size={16} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
