'use client'

import { useState, type FormEvent } from 'react'
import { brand, serviceAreas, services } from '@/data/brand'
import { emailLink } from '@/lib/contact'
import { ArrowRightIcon } from '@/components/Icons'

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')

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
          Opens your email app with the details filled in. Phone & WhatsApp can
          be added anytime.
        </p>
      )}
    </form>
  )
}
