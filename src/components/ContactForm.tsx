'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
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

/** Format digits as US phone: (xxx) xxx-xxxx (max 10 digits). */
function formatUsPhone(value: string): string {
  let digits = value.replace(/\D/g, '')

  // Drop leading country code 1 if user pastes +1 / 1XXXXXXXXXX
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }
  digits = digits.slice(0, 10)

  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function isCompleteUsPhone(value: string): boolean {
  return value.replace(/\D/g, '').length === 10
}

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [phone, setPhone] = useState('')
  const tel = phoneLink()

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatUsPhone(event.target.value))
  }

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
      setPhone('')
      form.reset()
      return
    }

    const name = String(data.get('name') || '').trim()
    const phoneValue = phone.trim()
    const service = String(data.get('service') || '').trim()
    const city = String(data.get('city') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !phoneValue || !service || !city || !message) {
      setFormStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    if (!isCompleteUsPhone(phoneValue)) {
      setFormStatus('error')
      setErrorMessage('Please enter a valid 10-digit US phone number.')
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
          phone: phoneValue,
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
      setPhone('')
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
          value={phone}
          onChange={onPhoneChange}
          placeholder="(555) 123-4567"
          autoComplete="tel"
          inputMode="numeric"
          enterKeyHint="next"
          maxLength={14}
          pattern="\(\d{3}\) \d{3}-\d{4}"
          title="US phone: (555) 123-4567"
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
