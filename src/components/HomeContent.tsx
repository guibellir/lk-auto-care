import Image from 'next/image'
import Link from 'next/link'
import {
  brand,
  processSteps,
  serviceAreas,
  services,
  stats,
} from '@/data/brand'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'
import { FaqList } from '@/components/FaqList'
import { ArrowRightIcon, MapPinIcon } from '@/components/Icons'
import { emailLink } from '@/lib/contact'

export function HomeContent() {
  const marqueeCities = [...serviceAreas, ...serviceAreas]

  return (
    <main id="main">
      {/* HERO */}
      <section className="hero" id="topo">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-wash" />
          <div className="hero-grid-lines" />
        </div>

        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker hero-reveal">
              {brand.city}, {brand.stateCode}
              <span className="hero-kicker-sep" aria-hidden="true" />
              Est. {brand.established}
              <span className="hero-kicker-sep" aria-hidden="true" />
              Greater Boston
            </p>
            <h1 className="hero-reveal hero-reveal-delay-1">
              Auto care built
              <br />
              for drivers who
              <br />
              <em>notice the details</em>
            </h1>
            <p className="hero-text hero-reveal hero-reveal-delay-2">
              Detailing, paint correction, LED headlights, exhaust work, and
              engine remap — from our shop in {brand.city} to clients across
              the metro.
            </p>
            <div className="hero-actions hero-reveal hero-reveal-delay-3">
              <a className="btn btn-primary btn-lg" href="#contact">
                Book a service
                <ArrowRightIcon size={18} />
              </a>
              <a className="btn btn-ghost btn-lg" href="#services">
                See services
              </a>
            </div>
          </div>

          <div className="hero-visual hero-reveal-visual" aria-hidden="false">
            <div className="signboard">
              <div className="signboard-rail">
                <span>LK</span>
                <span>PREMIUM</span>
                <span>AUTO CARE</span>
              </div>

              <div className="signboard-face">
                <div className="signboard-brick" aria-hidden="true" />
                <div className="signboard-mount">
                  <Image
                    src="/images/logo.png"
                    alt="LK Auto Care neon sign — washing, detailing, premium auto care since 2022"
                    className="signboard-logo"
                    width={420}
                    height={420}
                    priority
                  />
                </div>
                <div className="signboard-caption">
                  <span>Washing · Detailing</span>
                  <span>Boston</span>
                </div>
              </div>

              <div className="signboard-meta">
                {stats.map((s) => (
                  <div key={s.label} className="signboard-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container hero-baseline hero-reveal hero-reveal-delay-4">
          <span>Interior & exterior detail</span>
          <span className="baseline-dot" />
          <span>Paint polishing</span>
          <span className="baseline-dot" />
          <span>LED headlights</span>
          <span className="baseline-dot" />
          <span>Exhaust</span>
          <span className="baseline-dot" />
          <span>Engine remap</span>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee-section" aria-label="Cities we serve">
        <div className="marquee">
          <div className="marquee-track">
            {marqueeCities.map((area, i) => (
              <span className="marquee-item" key={`${area.name}-${i}`}>
                {area.name}
                {area.primary ? ' · HQ' : ''}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — editorial list, not template cards */}
      <section className="section services" id="services">
        <div className="container">
          <div className="services-head">
            <Reveal>
              <div className="section-label">Services</div>
              <h2 className="section-title">What we handle</h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="section-lead services-lead">
                Five core offerings. Clear scope. No package theater — we match
                the work to the vehicle and the finish you want.
              </p>
            </Reveal>
          </div>

          <div className="service-index">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index} className="service-row-wrap">
                <article className="service-row">
                  <span className="service-index-num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="service-row-body">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                  <ul className="service-row-points">
                    {service.highlights.slice(0, 2).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="services-footer">
            <Link className="text-link" href="/services">
              Full service details
              <ArrowRightIcon size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why" id="about">
        <div className="container why-grid">
          <Reveal variant="left">
            <div className="section-label">About</div>
            <h2 className="section-title">
              Shop-level standards.
              <br />
              Metro coverage.
            </h2>
            <p className="section-lead">
              {brand.name} is based in {brand.city}, Massachusetts. We focus on
              finish quality — cabin, paint, lighting, exhaust, and remap —
              without the generic “full detail package” noise.
            </p>
            <dl className="why-facts">
              <div>
                <dt>Home base</dt>
                <dd>
                  {brand.city}, {brand.stateCode}
                </dd>
              </div>
              <div>
                <dt>Since</dt>
                <dd>{brand.established}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Detail · Polish · Upgrades</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal variant="right">
            <blockquote className="why-quote">
              <p>
                Clean cabins. Honest paint work. Upgrades that fit the car —
                not the catalog.
              </p>
              <footer>
                <span>{brand.legalName}</span>
                <span>Everett · Greater Boston</span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section process" id="process">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-label">Process</div>
            <h2 className="section-title">How booking works</h2>
          </Reveal>
          <ol className="process-list">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i} as="li" className="process-step">
                <span className="process-step-num">{step.step}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* AREAS */}
      <section className="section areas" id="areas">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-label">Coverage</div>
            <h2 className="section-title">
              Based in Everett, serving the metro
            </h2>
            <p className="section-lead">
              Primary area around {brand.city}. Nearby cities listed below —
              ask if yours isn&apos;t here yet.
            </p>
          </Reveal>

          <div className="areas-list">
            {serviceAreas.map((area, i) => (
              <Reveal key={area.name} delay={i % 6} className="area-item-wrap">
                <div className={`area-item ${area.primary ? 'primary' : ''}`}>
                  <MapPinIcon size={14} />
                  <span>
                    {area.name}
                    {area.primary ? (
                      <em className="area-hq"> HQ</em>
                    ) : null}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="areas-cta">
            <p>
              Don&apos;t see your city?{' '}
              <a href="#contact">Ask — we may already cover it.</a>
            </p>
            <Link href="/areas" className="text-link">
              All service areas
              <ArrowRightIcon size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* GALLERY PLACEHOLDER */}
      <section className="section gallery" id="gallery">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-label">Work</div>
            <h2 className="section-title">Before & after</h2>
            <p className="section-lead">
              Photo set coming soon — real vehicles from detailing, polish, and
              upgrade jobs.
            </p>
          </Reveal>
          <div className="gallery-placeholder">
            {[
              'Interior detail',
              'Paint correction',
              'Lighting / exhaust',
            ].map((label, n) => (
              <Reveal key={label} delay={n} className="gallery-slot">
                <div className="gallery-card">
                  <span className="gallery-label">{label}</span>
                  <span className="gallery-soon">Photos soon</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="container faq-layout">
          <Reveal>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Common questions</h2>
            <p className="section-lead">
              Location, services, and booking for drivers near {brand.city},{' '}
              {brand.stateCode}.
            </p>
          </Reveal>

          <FaqList />
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <div className="container contact-grid">
          <Reveal>
            <div className="section-label">Contact</div>
            <h2 className="section-title">Request a quote</h2>
            <p className="section-lead">
              Vehicle, service, and city — we&apos;ll reply with availability
              and a clear recommendation.
            </p>
            <div className="contact-points">
              <div>
                <MapPinIcon />
                <div>
                  <strong>Location</strong>
                  <span>
                    {brand.city}, {brand.state}
                  </span>
                </div>
              </div>
              <div>
                <strong className="contact-mail-label">Email</strong>
                <a href={emailLink()}>{brand.email}</a>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
