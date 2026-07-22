'use client'

import { useState, type FormEvent } from 'react'
import { brand, serviceAreas, services } from '@/data/brand'
import { emailLink, phoneLink } from '@/lib/contact'
import { ArrowRightIcon } from '@/components/Icons'

type FormStatus = 'idle' | 'submitting' | 'sent' | 'error'

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const tel = phoneLink()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formStatus === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      service: String(data.get('service') || '').trim(),
      city: String(data.get('city') || '').trim(),
      message: String(data.get('message') || '').trim(),
      website: String(data.get('website') || '').trim(),
    }

    setFormStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = (await res.json().catch(() => null)) as {
        ok?: boolean
        error?: string
      } | null

      if (!res.ok || !json?.ok) {
        setFormStatus('error')
        setErrorMessage(
          json?.error ||
            'Could not send your request. Please try again or call us.',
        )
        return
      }

      setFormStatus('sent')
      form.reset()
    } catch {
      setFormStatus('error')
      setErrorMessage(
        'Could not send your request. Please check your connection or call us.',
      )
    }
  }

  return (
    <form className="contact-form glass-panel" onSubmit={onSubmit} noValidate={false}>
      {/* Honeypot — hidden from real users */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          spellCheck={false}
          disabled={formStatus === 'submitting'}
        />
      </div>

      <div className="form-row">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="(555) 123-4567"
          autoComplete="tel"
          inputMode="tel"
          enterKeyHint="next"
          disabled={formStatus === 'submitting'}
        />
      </div>

      <div className="form-row">
        <label htmlFor="service">Service</label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          disabled={formStatus === 'submitting'}
        >
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
        <select
          id="city"
          name="city"
          required
          defaultValue=""
          disabled={formStatus === 'submitting'}
        >
          <option value="" disabled>
            Select a city
          </option>
          {serviceAreas.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
          <option value="Other / nearby">Other / nearby</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Vehicle year/make/model and what you want done..."
          required
          enterKeyHint="send"
          autoCapitalize="sentences"
          disabled={formStatus === 'submitting'}
        />
      </div>

      <button
        className="btn btn-primary btn-lg btn-block"
        type="submit"
        disabled={formStatus === 'submitting'}
      >
        {formStatus === 'submitting' ? 'Sending…' : 'Send request'}
        {formStatus !== 'submitting' ? <ArrowRightIcon size={18} /> : null}
      </button>

      {formStatus === 'sent' ? (
        <p className="form-note form-note-success" role="status">
          Request sent — we will get back to you soon.
          {tel ? (
            <>
              {' '}
              Need a faster reply?{' '}
              <a href={tel}>Call or text {brand.phoneDisplay || brand.phone}</a>.
            </>
          ) : null}
        </p>
      ) : formStatus === 'error' ? (
        <p className="form-note form-note-error" role="alert">
          {errorMessage}{' '}
          {tel ? (
            <>
              Or{' '}
              <a href={tel}>call {brand.phoneDisplay || brand.phone}</a>
              {' / '}
              <a href={emailLink()}>{brand.email}</a>.
            </>
          ) : (
            <>
              Or email <a href={emailLink()}>{brand.email}</a>.
            </>
          )}
        </p>
      ) : (
        <p className="form-note">
          We will email the shop with your details. No spam.
          {tel ? (
            <>
              {' '}
              Prefer to talk?{' '}
              <a href={tel}>Call or text {brand.phoneDisplay || brand.phone}</a>.
            </>
          ) : null}
        </p>
      )}
    </form>
  )
}
