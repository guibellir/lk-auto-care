import { useEffect } from 'react'
import { getSiteUrl } from '../data/brand'

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  noIndex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/** Updates title, description, canonical, and Open Graph per route (SPA). */
export function Seo({
  title,
  description,
  path = '/',
  image = '/images/logo.png',
  imageAlt = 'LK Auto Care — premium auto detailing in Everett, MA',
  type = 'website',
  publishedTime,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const site = getSiteUrl()
    const url = `${site}${path.startsWith('/') ? path : `/${path}`}`
    const imageUrl = image.startsWith('http') ? image : `${site}${image}`

    document.title = title
    setMeta('name', 'description', description)
    setMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    )
    setCanonical(url)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', imageAlt)

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)

    if (publishedTime) {
      setMeta('property', 'article:published_time', publishedTime)
    }
  }, [title, description, path, image, imageAlt, type, publishedTime, noIndex])

  return null
}

/** JSON-LD script tags */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
