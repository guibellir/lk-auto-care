import {
  brand,
  faqItems,
  getSiteUrl,
  serviceAreas,
  services,
} from '@/data/brand'
import { galleryPairs } from '@/data/gallery'

const phoneE164 = brand.phone
  ? `+${brand.phone.replace(/\D/g, '')}`
  : undefined

/** Site-wide: LocalBusiness + WebSite (safe on every page) */
export function buildSiteStructuredData() {
  const site = getSiteUrl()

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['AutomotiveBusiness', 'LocalBusiness', 'AutoRepair'],
    '@id': `${site}/#business`,
    name: brand.name,
    alternateName: [brand.legalName, brand.shortName],
    description: brand.description,
    url: site,
    image: [
      `${site}/images/logo.png`,
      `${site}/images/bg-challenger.jpg`,
      `${site}/images/gallery/gti-rear-after.jpg`,
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${site}/images/logo.png`,
      width: 493,
      height: 495,
    },
    ...(phoneE164 ? { telephone: phoneE164 } : {}),
    email: brand.email,
    priceRange: brand.priceRange,
    foundingDate: String(brand.established),
    slogan: brand.slogan,
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
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
      name: a.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${brand.state}, ${brand.countryCode}`,
      },
    })),
    knowsAbout: services.map((s) => s.name),
    sameAs: [
      `https://www.instagram.com/${brand.instagram}/`,
      ...(brand.whatsapp
        ? [`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`]
        : []),
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        ...(phoneE164 ? { telephone: phoneE164 } : {}),
        contactType: 'customer service',
        areaServed: 'US-MA',
        availableLanguage: ['English', 'Portuguese'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${brand.name} auto care services`,
      itemListElement: services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        url: `${site}/services#${s.id}`,
        itemOffered: {
          '@type': 'Service',
          '@id': `${site}/services#${s.id}`,
          name: s.name,
          description: s.description,
          provider: { '@id': `${site}/#business` },
          areaServed: serviceAreas.map((a) => `${a.name}, ${brand.stateCode}`),
          serviceType: s.shortName,
        },
      })),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site}/`,
    },
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    url: site,
    name: brand.name,
    alternateName: brand.legalName,
    description: `${brand.name} — premium auto detailing, polishing, LED headlights, exhaust & engine remap in ${brand.city}, ${brand.stateCode} and Greater Boston.`,
    publisher: { '@id': `${site}/#business` },
    inLanguage: brand.language,
    copyrightYear: brand.established,
    copyrightHolder: { '@id': `${site}/#business` },
  }

  return [localBusiness, webSite]
}

/** Homepage only — FAQ must match visible FAQ content */
export function buildHomeStructuredData() {
  const site = getSiteUrl()

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/#webpage`,
    url: site,
    name: `${brand.name} | Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`,
    description: brand.description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#business` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${site}/images/bg-challenger.jpg`,
    },
    inLanguage: brand.language,
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${site}/#faq`,
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
    '@id': `${site}/#services-list`,
    name: `${brand.name} services`,
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      description: s.description,
      url: `${site}/services#${s.id}`,
    })),
  }

  const imageGallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${site}/#gallery`,
    name: `${brand.name} before & after detailing results`,
    description:
      'Real before and after auto detailing results from LK Auto Care in Everett, MA.',
    url: `${site}/#gallery`,
    image: galleryPairs.flatMap((pair) => [
      {
        '@type': 'ImageObject',
        contentUrl: `${site}${pair.before}`,
        name: pair.beforeAlt,
        description: pair.beforeAlt,
      },
      {
        '@type': 'ImageObject',
        contentUrl: `${site}${pair.after}`,
        name: pair.afterAlt,
        description: pair.afterAlt,
      },
    ]),
  }

  return [webPage, faqPage, serviceList, imageGallery]
}

export function buildBreadcrumbList(
  items: { name: string; path: string }[],
) {
  const site = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}

