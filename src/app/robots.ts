import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/data/brand'

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  }
}
