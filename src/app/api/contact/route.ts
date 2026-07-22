import { NextResponse } from 'next/server'

import { brand } from '@/data/brand'

export const runtime = 'nodejs'

type ContactBody = {
  name?: string
  phone?: string
  service?: string
  city?: string
  message?: string
  /** Honeypot — must stay empty */
  website?: string
}

function trim(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim()
  if (!accessKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Form is not configured yet. Please call or text us directly.',
      },
      { status: 503 },
    )
  }

  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request.' },
      { status: 400 },
    )
  }

  // Bot filled the hidden field
  if (trim(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const name = trim(body.name, 120)
  const phone = trim(body.phone, 40)
  const service = trim(body.service, 120)
  const city = trim(body.city, 80)
  const message = trim(body.message, 2000)

  if (!name || !phone || !service || !city || !message) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in all required fields.' },
      { status: 400 },
    )
  }

  const subject = `New lead — ${service} (${city})`
  const text = [
    `New quote request from the ${brand.name} website`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `City: ${city}`,
    '',
    'Message:',
    message,
  ].join('\n')

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: `${brand.name} Website`,
        name,
        phone,
        service,
        city,
        message: text,
        // Helps Web3Forms templates / inbox filters
        replyto: brand.email,
      }),
    })

    const data = (await res.json().catch(() => null)) as {
      success?: boolean
      message?: string
    } | null

    if (!res.ok || !data?.success) {
      console.error('[contact] Web3Forms error', res.status, data)
      return NextResponse.json(
        {
          ok: false,
          error:
            'Could not send your request. Please try again or call us.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] submit failed', err)
    return NextResponse.json(
      {
        ok: false,
        error: 'Could not send your request. Please try again or call us.',
      },
      { status: 502 },
    )
  }
}
