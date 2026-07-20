'use client'

import { useState } from 'react'
import { faqItems } from '@/data/brand'
import { Reveal } from '@/components/Reveal'

export function FaqList() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="faq-list">
      {faqItems.map((item, index) => {
        const open = openFaq === index
        return (
          <Reveal
            key={item.question}
            delay={index}
            variant="up"
            className="faq-item-wrap"
          >
            <div className={`faq-item ${open ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={open}
                onClick={() => setOpenFaq(open ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
              <div
                className={`faq-a ${open ? 'open' : ''}`}
                hidden={!open}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
