import type { Metadata } from 'next'
import { HomeContent } from '@/components/HomeContent'
import { JsonLd } from '@/components/JsonLd'
import { brand, getSiteUrl } from '@/data/brand'
import { buildHomeStructuredData } from '@/seo/structuredData'

const site = getSiteUrl()

export const metadata: Metadata = {
  title: {
    absolute: `${brand.name} | Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`,
  },
  description:
    'Premium auto detailing, paint polishing, LED headlights, exhaust replacement & engine remap in Everett, MA. Serving Greater Boston — Medford, Melrose, Somerville, Cambridge & more.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${brand.name} | Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`,
    description:
      'Interior & exterior detailing, paint correction, LED headlights, exhaust & engine remap. Headquarters in Everett — serving Greater Boston.',
    url: site,
    type: 'website',
  },
  twitter: {
    title: `${brand.name} | Auto Detailing Everett MA`,
    description:
      'Detailing, polish, LED, exhaust & remap. Based in Everett, serving Greater Boston.',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeStructuredData()} />
      <HomeContent />
    </>
  )
}
