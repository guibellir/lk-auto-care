'use client'

import { useState, type FormEvent } from 'react'
import { brand, serviceAreas, services } from '@/data/brand'
import { emailLink, phoneLink } from '@/lib/contact'
import { ArrowRightIcon } from '@/components/Icons'

type FormStatus = 'idle' | 'submitting' | 'sent' | 'error'

/**
 * Web3Forms free plan only allows submissions from the browser
 * (server-side /api calls return "method is not allowed").
 * Access key is public-by-design for client forms.
 */
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() ||
  ''

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const tel = phoneLink()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formStatus === 'submitting') return

    if (!WEB3FORMS_ACCESS_KEY) {
      setFormStatus('error')
      setErrorMessage(
        'Form is not configured yet. Please call or text us directly.',
      )
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill this; humans never see it
    if (String(data.get('website') || '').trim()) {
      setFormStatus('sent')
      form.reset()
      return
    }

    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const service = String(data.get('service') || '').trim()
    const city = String(data.get('city') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !phone || !service || !city || !message) {
      setFormStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    // Web3Forms already lists each field (name, phone, service, city)
    // in the email — send only the visitor's note in `message`.
    const subject = `New lead — ${service} (${city})`

    setFormStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: `${brand.name} Website`,
          name,
          phone,
          service,
          city,
          message,
        }),
      })

      const json = (await res.json().catch(() => null)) as {
        success?: boolean
        message?: string
      } | null

      if (!res.ok || !json?.success) {
        setFormStatus('error')
        setErrorMessage(
          json?.message ||
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
    <form className="contact-form glass-panel" onSubmit={onSubmit}>
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
