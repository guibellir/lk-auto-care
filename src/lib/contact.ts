import { brand } from '@/data/brand'

export function phoneLink(): string | null {
  if (!brand.phone) return null
  return `tel:+${brand.phone.replace(/\D/g, '')}`
}

export function whatsappLink(message?: string): string | null {
  const digits = (brand.whatsapp || brand.phone || '').replace(/\D/g, '')
  if (!digits) return null
  const text =
    message ??
    `Hi! I found ${brand.name} online and I would like to book a service.`
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function emailLink(subject?: string): string {
  const sub = subject ?? `Service inquiry — ${brand.name}`
  return `mailto:${brand.email}?subject=${encodeURIComponent(sub)}`
}

export function instagramUrl(): string {
  return `https://www.instagram.com/${brand.instagram}/`
}
