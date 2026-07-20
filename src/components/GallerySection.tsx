'use client'

import Image from 'next/image'
import { useState } from 'react'
import { galleryPairs } from '@/data/gallery'
import { Reveal } from '@/components/Reveal'

export function GallerySection() {
  const [active, setActive] = useState(0)
  const pair = galleryPairs[active]

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Results</div>
          <h2 className="section-title">
            Before & after —{' '}
            <span className="text-gradient">real work</span>
          </h2>
          <p className="section-lead">
            Interior detail on a VW Golf GTI. Same angles, same car — dirt out,
            finish restored.
          </p>
        </Reveal>

        <Reveal className="gallery-tabs-wrap">
          <div className="gallery-tabs" role="tablist" aria-label="Gallery views">
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

        <Reveal key={pair.id} className="ba-stage">
          <div className="ba-meta">
            <span className="ba-vehicle">{pair.vehicle}</span>
            <span className="ba-area">{pair.area}</span>
          </div>

          <div className="ba-grid">
            <figure className="ba-frame">
              <span className="ba-badge before">Before</span>
              <Image
                src={pair.before}
                alt={pair.beforeAlt}
                width={720}
                height={900}
                className="ba-image"
                sizes="(max-width: 800px) 100vw, 50vw"
              />
            </figure>
            <figure className="ba-frame">
              <span className="ba-badge after">After</span>
              <Image
                src={pair.after}
                alt={pair.afterAlt}
                width={720}
                height={900}
                className="ba-image"
                sizes="(max-width: 800px) 100vw, 50vw"
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
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
