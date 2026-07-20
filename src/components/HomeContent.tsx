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
import { GallerySection } from '@/components/GallerySection'
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  serviceIcon,
} from '@/components/Icons'
import { emailLink, phoneLink } from '@/lib/contact'

export function HomeContent() {
  const marqueeCities = [...serviceAreas, ...serviceAreas]
  const tel = phoneLink()

  return (
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
              {tel ? (
                <a className="btn btn-ghost btn-lg" href={tel}>
                  <PhoneIcon size={18} />
                  Give us a call
                </a>
              ) : (
                <a className="btn btn-ghost btn-lg" href="#services">
                  Explore services
                </a>
              )}
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
            <div className="sign-scene">
              <div className="sign-scene-glow" aria-hidden="true" />
              <div className="sign-scene-wall" aria-hidden="true" />

              <div className="sign-fixture">
                <div className="sign-bracket" aria-hidden="true">
                  <span />
                  <span />
                </div>

                <div className="sign-disc">
                  <div className="sign-disc-ring" aria-hidden="true" />
                  <Image
                    src="/images/logo-centered.png"
                    alt="LK Auto Care neon sign — washing, detailing, premium auto care since 2022"
                    className="sign-logo"
                    width={466}
                    height={466}
                    sizes="(max-width: 480px) 70vw, 300px"
                    quality={80}
                    priority
                  />
                </div>

                <div className="sign-plaque">
                  <div className="sign-plaque-row">
                    <span>
                      {brand.city}, {brand.stateCode}
                    </span>
                    <span className="sign-plaque-dot" aria-hidden="true" />
                    <span>Est. {brand.established}</span>
                  </div>
                  <p className="sign-plaque-tag">
                    Interior & exterior detail · Polish · LED · Exhaust · Remap
                  </p>
                </div>
              </div>
            </div>
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
        <div className="section-glow section-glow-orange" aria-hidden="true" />
        <div className="container">
          <Reveal className="section-header" variant="rise">
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
                variant={index % 2 === 0 ? 'up' : 'scale'}
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
                  <Link className="service-link" href="/services">
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
          <Reveal variant="left" className="why-copy">
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
              pattern, we treat every vehicle like it has somewhere to be seen.
            </p>
            <ul className="why-list stagger-children">
              <li className="stagger-item">
                <CheckIcon /> Premium interior & exterior detailing
              </li>
              <li className="stagger-item">
                <CheckIcon /> Paint correction & polishing
              </li>
              <li className="stagger-item">
                <CheckIcon /> LED, exhaust & remap upgrades
              </li>
              <li className="stagger-item">
                <CheckIcon /> Greater Boston coverage from Everett
              </li>
            </ul>
          </Reveal>

          <Reveal variant="blur" delay={1} className="why-panel">
            <div className="glass-panel glass-panel-accent">
              <div className="glass-stat">
                <strong>ESTD {brand.established}</strong>
                <span>Built for Boston-area drivers</span>
              </div>
              <div className="glass-divider" />
              <p>
                “Washing · Detailing · Premium Auto Care” is more than a slogan
                — it is the product: clean cabins, crisp paint, brighter lights,
                confident sound, and responsive power.
              </p>
              <div className="glass-tags stagger-children">
                <span className="stagger-item">Detail</span>
                <span className="stagger-item">Polish</span>
                <span className="stagger-item">LED</span>
                <span className="stagger-item">Exhaust</span>
                <span className="stagger-item">Remap</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section process" id="process">
        <div className="section-glow section-glow-cyan" aria-hidden="true" />
        <div className="container">
          <Reveal className="section-header center" variant="rise">
            <div className="section-label">How it works</div>
            <h2 className="section-title">Book in three simple steps</h2>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.step}
                variant="up"
                delay={i}
                className="process-card"
              >
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
          <Reveal className="section-header" variant="rise">
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
              <Reveal
                key={area.name}
                delay={i % 6}
                variant="scale"
                className="area-chip-wrap"
              >
                <div className={`area-chip ${area.primary ? 'primary' : ''}`}>
                  <MapPinIcon size={16} />
                  <span>{area.name}</span>
                  {area.primary ? (
                    <span className="area-badge">Home base</span>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="areas-cta" delayMs={120}>
            <p>
              Don&apos;t see your city?{' '}
              <a href="#contact">Ask us — we may already cover it.</a>
            </p>
            <Link href="/areas" className="btn btn-ghost">
              View all areas
              <ArrowRightIcon size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <GallerySection />

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="container faq-layout">
          <Reveal variant="left">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Questions, answered</h2>
            <p className="section-lead">
              Local SEO-friendly answers for drivers searching auto detailing
              and upgrades near {brand.city}, {brand.stateCode}.
            </p>
          </Reveal>

          <FaqList />
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <div className="section-glow section-glow-mixed" aria-hidden="true" />
        <div className="container contact-grid">
          <Reveal variant="left">
            <div className="section-label">Contact</div>
            <h2 className="section-title">
              Ready for a <span className="text-gradient">premium finish?</span>
            </h2>
            <p className="section-lead">
              Give us a call or send a quick message with your vehicle and city.
              We&apos;ll confirm availability and recommend the right service.
            </p>
            <div className="contact-points stagger-children">
              {tel ? (
                <div className="stagger-item">
                  <PhoneIcon />
                  <div>
                    <strong>Call or text</strong>
                    <a href={tel}>{brand.phoneDisplay || brand.phone}</a>
                  </div>
                </div>
              ) : null}
              <div className="stagger-item">
                <MapPinIcon />
                <div>
                  <strong>Location</strong>
                  <span>
                    {brand.city}, {brand.state}
                  </span>
                </div>
              </div>
              <div className="stagger-item">
                <MailIcon />
                <div>
                  <strong>Email</strong>
                  <a href={emailLink()}>{brand.email}</a>
                </div>
              </div>
            </div>
            {tel ? (
              <div className="contact-actions stagger-children">
                <a className="btn btn-secondary stagger-item" href={tel}>
                  <PhoneIcon size={18} />
                  Call {brand.phoneDisplay || brand.phone}
                </a>
              </div>
            ) : null}
          </Reveal>

          <Reveal variant="blur" delay={1} className="contact-form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
