'use client'

import Image from 'next/image'
import { useState } from 'react'
import { brand } from '@/data/brand'
import { galleryPairs } from '@/data/gallery'
import { Reveal } from '@/components/Reveal'
import { InstagramIcon } from '@/components/Icons'
import { instagramUrl } from '@/lib/contact'

export function GallerySection() {
  const [active, setActive] = useState(0)
  const pair = galleryPairs[active]
  const ig = instagramUrl()

  return (
    <section className="section gallery" id="gallery">
      <div className="section-glow section-glow-cyan" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-header" variant="rise">
          <div className="section-label">Results</div>
          <h2 className="section-title">
            Before & after — <span className="text-gradient">real work</span>
          </h2>
          <p className="section-lead">
            Interior detail on a VW Golf GTI. Same angles, same car — dirt out,
            finish restored.
          </p>
        </Reveal>

        <Reveal className="gallery-tabs-wrap" delayMs={80}>
          <div
            className="gallery-tabs"
            role="tablist"
            aria-label="Gallery views"
          >
            {galleryPairs.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`gallery-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal key={pair.id} variant="blur" className="ba-stage">
          <div className="ba-meta">
            <span className="ba-vehicle">{pair.vehicle}</span>
            <span className="ba-area">{pair.area}</span>
          </div>

          <div className="ba-grid">
            <figure className="ba-frame ba-frame-reveal">
              <span className="ba-badge before">Before</span>
              <Image
                src={pair.before}
                alt={pair.beforeAlt}
                width={720}
                height={900}
                className="ba-image"
                sizes="(max-width: 720px) 92vw, 45vw"
                quality={72}
              />
            </figure>
            <figure className="ba-frame ba-frame-reveal ba-frame-delay">
              <span className="ba-badge after">After</span>
              <Image
                src={pair.after}
                alt={pair.afterAlt}
                width={720}
                height={900}
                className="ba-image"
                sizes="(max-width: 720px) 92vw, 45vw"
                quality={72}
              />
            </figure>
          </div>
        </Reveal>

        <div className="gallery-thumbs" aria-hidden="true">
          {galleryPairs.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`gallery-thumb ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              tabIndex={-1}
            >
              <Image
                src={item.after}
                alt=""
                width={160}
                height={120}
                className="gallery-thumb-img"
                sizes="160px"
                quality={60}
              />
            </button>
          ))}
        </div>

        <Reveal className="gallery-instagram" delayMs={100}>
          <div className="gallery-instagram-card glass-panel">
            <div className="gallery-instagram-copy">
              <span className="gallery-instagram-label">
                <InstagramIcon size={16} />
                On Instagram
              </span>
              <h3>
                More transformations live on{' '}
                <span className="text-gradient">@{brand.instagram}</span>
              </h3>
              <p>
                Follow us for the latest details, paint corrections, and
                garage drops — fresh work as it happens.
              </p>
            </div>
            <a
              className="btn btn-instagram"
              href={ig}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon size={18} />
              Follow on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
