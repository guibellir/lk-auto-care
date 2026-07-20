import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  brand,
  faqItems,
  processSteps,
  serviceAreas,
  services,
  stats,
} from '../data/brand'
import { buildStructuredData } from '../seo/structuredData'
import { Seo, JsonLd } from '../components/Seo'
import { Reveal } from '../components/Reveal'
import {
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  serviceIcon,
} from '../components/Icons'
import { emailLink } from '../lib/contact'

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')
  const structuredData = buildStructuredData()
  const marqueeCities = [...serviceAreas, ...serviceAreas]

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const service = String(data.get('service') || '').trim()
    const city = String(data.get('city') || '').trim()
    const message = String(data.get('message') || '').trim()
    const subject = `Quote request — ${service || 'service'} (${city || brand.city})`
    const body = [
      `Name: ${name}`,
      `Service: ${service}`,
      `City: ${city}`,
      '',
      message,
    ].join('\n')
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormStatus('sent')
  }

  return (
    <>
      <Seo
        title="LK Auto Care | Premium Auto Detailing in Everett, MA"
        description="LK Auto Care — premium interior & exterior detailing, polishing, LED headlights, exhaust replacement, and engine remap in Everett, MA. Serving Medford, Melrose, Boston, Brookline, Somerville, Newton, Watertown & more."
        path="/"
        image="/images/logo.png"
        imageAlt="LK Auto Care neon logo — premium auto care in Boston"
      />
      <JsonLd data={structuredData as object[]} />

      <main id="main">
        {/* HERO */}
        <section className="hero" id="topo">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-orb hero-orb-cyan" />
            <div className="hero-orb hero-orb-orange" />
            <div className="hero-grid-lines" />
            <div className="hero-noise" />
          </div>

          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-badge hero-reveal">
                <span className="badge-dot" />
                Based in {brand.city}, {brand.stateCode} · Est. {brand.established}
              </div>
              <h1 className="hero-reveal hero-reveal-delay-1">
                Premium auto care
                <br />
                with a <span className="text-gradient">neon finish</span>
              </h1>
              <p className="hero-text hero-reveal hero-reveal-delay-2">
                Interior & exterior detailing, paint polishing, LED headlights,
                exhaust upgrades, and engine remap — crafted for drivers across
                Greater Boston who want results that look as good as they feel.
              </p>
              <div className="hero-actions hero-reveal hero-reveal-delay-3">
                <a className="btn btn-primary btn-lg" href="#contact">
                  Book a service
                  <ArrowRightIcon size={18} />
                </a>
                <a className="btn btn-ghost btn-lg" href="#services">
                  Explore services
                </a>
              </div>
              <div className="hero-stats hero-reveal hero-reveal-delay-4">
                {stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual hero-reveal-visual">
              <div className="hero-logo-ring">
                <div className="hero-logo-glow" />
                <img
                  src="/images/logo.png"
                  alt="LK Auto Care — washing, detailing, premium auto care since 2022"
                  className="hero-logo"
                  width={360}
                  height={360}
                />
              </div>
              <div className="floating-chip chip-1">Washing · Detailing</div>
              <div className="floating-chip chip-2">Boston metro</div>
              <div className="floating-chip chip-3">Premium finish</div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee-section" aria-label="Cities we serve">
          <div className="marquee">
            <div className="marquee-track">
              {marqueeCities.map((area, i) => (
                <span className="marquee-item" key={`${area.name}-${i}`}>
                  <MapPinIcon size={14} />
                  {area.name}
                  {area.primary ? ' · HQ' : ''}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section services" id="services">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-label">What we do</div>
              <h2 className="section-title">
                Full-spectrum auto care,{' '}
                <span className="text-gradient-orange">one standard</span>
              </h2>
              <p className="section-lead">
                From showroom-level detailing to performance upgrades — every
                service is built around precision, clean finish, and long-term
                pride of ownership.
              </p>
            </Reveal>

            <div className="service-bento">
              {services.map((service, index) => (
                <Reveal
                  key={service.id}
                  variant="up"
                  delay={index}
                  className={`service-card service-card-${index + 1}`}
                >
                  <article>
                    <div className="service-icon">{serviceIcon(service.icon)}</div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <ul className="service-highlights">
                      {service.highlights.slice(0, 3).map((h) => (
                        <li key={h}>
                          <CheckIcon size={14} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Link className="service-link" to="/services">
                      Learn more <ArrowRightIcon size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section why" id="about">
          <div className="container why-grid">
            <Reveal variant="left">
              <div className="section-label">Why LK</div>
              <h2 className="section-title">
                Modern craft.
                <br />
                <span className="text-gradient">Zero shortcuts.</span>
              </h2>
              <p className="section-lead">
                {brand.name} brings a neon-era standard to auto aesthetics and
                light performance work in {brand.city}. Whether you need a deep
                detail before a weekend drive or a sharper night-time beam
                pattern, we treat every vehicle like it has somewhere to be
                seen.
              </p>
              <ul className="why-list">
                <li>
                  <CheckIcon /> Premium interior & exterior detailing
                </li>
                <li>
                  <CheckIcon /> Paint correction & polishing
                </li>
                <li>
                  <CheckIcon /> LED, exhaust & remap upgrades
                </li>
                <li>
                  <CheckIcon /> Greater Boston coverage from Everett
                </li>
              </ul>
            </Reveal>

            <Reveal variant="right" className="why-panel">
              <div className="glass-panel">
                <div className="glass-stat">
                  <strong>ESTD {brand.established}</strong>
                  <span>Built for Boston-area drivers</span>
                </div>
                <div className="glass-divider" />
                <p>
                  “Washing · Detailing · Premium Auto Care” is more than a
                  slogan — it is the product: clean cabins, crisp paint,
                  brighter lights, confident sound, and responsive power.
                </p>
                <div className="glass-tags">
                  <span>Detail</span>
                  <span>Polish</span>
                  <span>LED</span>
                  <span>Exhaust</span>
                  <span>Remap</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section process" id="process">
          <div className="container">
            <Reveal className="section-header center">
              <div className="section-label">How it works</div>
              <h2 className="section-title">Book in three simple steps</h2>
            </Reveal>
            <div className="process-grid">
              {processSteps.map((step, i) => (
                <Reveal key={step.step} delay={i} className="process-card">
                  <span className="process-num">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AREAS */}
        <section className="section areas" id="areas">
          <div className="container">
            <Reveal className="section-header">
              <div className="section-label">Service areas</div>
              <h2 className="section-title">
                Based in Everett —{' '}
                <span className="text-gradient">serving the metro</span>
              </h2>
              <p className="section-lead">
                Proudly rooted in {brand.city}, {brand.stateCode}, with clients
                across neighboring cities. More towns can be added as we grow.
              </p>
            </Reveal>

            <div className="areas-grid">
              {serviceAreas.map((area, i) => (
                <Reveal key={area.name} delay={i % 6} className="area-chip-wrap">
                  <div
                    className={`area-chip ${area.primary ? 'primary' : ''}`}
                  >
                    <MapPinIcon size={16} />
                    <span>{area.name}</span>
                    {area.primary ? (
                      <span className="area-badge">Home base</span>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="areas-cta">
              <p>
                Don&apos;t see your city?{' '}
                <a href="#contact">Ask us — we may already cover it.</a>
              </p>
              <Link to="/areas" className="btn btn-ghost">
                View all areas
                <ArrowRightIcon size={16} />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* GALLERY PLACEHOLDER */}
        <section className="section gallery" id="gallery">
          <div className="container">
            <Reveal className="section-header center">
              <div className="section-label">Results</div>
              <h2 className="section-title">
                Before & after — <span className="text-muted">coming soon</span>
              </h2>
              <p className="section-lead">
                Real vehicles, real transformations. We&apos;ll showcase
                interior/exterior details, polish work, and upgrades as soon as
                the photo set is ready.
              </p>
            </Reveal>
            <div className="gallery-placeholder">
              {[1, 2, 3].map((n) => (
                <Reveal key={n} delay={n} className="gallery-slot">
                  <div className="gallery-card">
                    <div className="gallery-shimmer" />
                    <span>Before / After {n}</span>
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
              <h2 className="section-title">
                Questions, answered
              </h2>
              <p className="section-lead">
                Local SEO-friendly answers for drivers searching auto detailing
                and upgrades near {brand.city}, {brand.stateCode}.
              </p>
            </Reveal>

            <div className="faq-list">
              {faqItems.map((item, index) => {
                const open = openFaq === index
                return (
                  <Reveal key={item.question} delay={index} className="faq-item-wrap">
                    <div className={`faq-item ${open ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={open}
                        onClick={() =>
                          setOpenFaq(open ? null : index)
                        }
                      >
                        <span>{item.question}</span>
                        <span className="faq-icon" aria-hidden="true">
                          {open ? '−' : '+'}
                        </span>
                      </button>
                      <div className="faq-a" hidden={!open}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="container contact-grid">
            <Reveal>
              <div className="section-label">Contact</div>
              <h2 className="section-title">
                Ready for a <span className="text-gradient">premium finish?</span>
              </h2>
              <p className="section-lead">
                Tell us about your vehicle and city. We&apos;ll get back with
                availability and a clear recommendation.
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

            <Reveal variant="scale" className="contact-form-wrap">
              <form className="contact-form glass-panel" onSubmit={onSubmit}>
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="service">Service</label>
                  <select id="service" name="service" required defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.shortName}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Other / Multiple">Other / Multiple</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    placeholder="e.g. Medford"
                    list="city-list"
                    autoComplete="address-level2"
                  />
                  <datalist id="city-list">
                    {serviceAreas.map((a) => (
                      <option key={a.name} value={a.name} />
                    ))}
                  </datalist>
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Vehicle year/make/model and what you want done..."
                    required
                  />
                </div>
                <button className="btn btn-primary btn-lg btn-block" type="submit">
                  Send request
                  <ArrowRightIcon size={18} />
                </button>
                {formStatus === 'sent' ? (
                  <p className="form-note">
                    Opening your email client… If nothing opens, write us at{' '}
                    <a href={emailLink()}>{brand.email}</a>.
                  </p>
                ) : (
                  <p className="form-note">
                    Opens your email app with the details filled in. Phone &
                    WhatsApp can be added anytime.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
