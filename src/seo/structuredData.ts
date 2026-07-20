import {
  brand,
  faqItems,
  getSiteUrl,
  serviceAreas,
  services,
} from '@/data/brand'

/** JSON-LD for AutoRepair / LocalBusiness + FAQ + Services (local SEO) */
export function buildStructuredData() {
  const site = getSiteUrl()

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['AutomotiveBusiness', 'LocalBusiness'],
    '@id': `${site}/#business`,
    name: brand.name,
    alternateName: brand.legalName,
    description: brand.description,
    url: site,
    image: `${site}/images/logo.png`,
    logo: `${site}/images/logo.png`,
    ...(brand.phone ? { telephone: `+${brand.phone.replace(/\D/g, '')}` } : {}),
    email: brand.email,
    priceRange: brand.priceRange,
    foundingDate: String(brand.established),
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.city,
      addressRegion: brand.stateCode,
      addressCountry: brand.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.4084,
      longitude: -71.0537,
    },
    areaServed: serviceAreas.map((a) => ({
      '@type': 'City',
      name: `${a.name}, ${brand.stateCode}`,
    })),
    sameAs: [`https://www.instagram.com/${brand.instagram}/`],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto care services',
      itemListElement: services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          provider: { '@id': `${site}/#business` },
          areaServed: serviceAreas.map((a) => a.name).join(', '),
        },
      })),
    },
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    url: site,
    name: `${brand.name} — Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`,
    description: brand.slogan,
    publisher: { '@id': `${site}/#business` },
    inLanguage: brand.language,
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const serviceList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LK Auto Care services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      description: s.description,
      url: `${site}/#services`,
    })),
  }

  return [localBusiness, webSite, faqPage, serviceList]
}
