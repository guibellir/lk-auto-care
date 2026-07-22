import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/data/brand'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl()
  const now = new Date()

  return [
    {
      url: `${site}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${site}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${site}/areas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
