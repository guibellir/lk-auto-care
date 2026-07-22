import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { JsonLd } from '@/components/JsonLd'
import { brand, getSiteUrl, siteKeywords } from '@/data/brand'
import { buildSiteStructuredData } from '@/seo/structuredData'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['500', '600', '700'],
  preload: true,
  adjustFontFallback: true,
})

const siteUrl = getSiteUrl()

const defaultTitle = `${brand.name} | Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`
const defaultDescription =
  'Premium auto detailing, paint polishing, LED headlights, exhaust replacement & engine remap in Everett, MA. Serving Greater Boston — Medford, Melrose, Somerville, Cambridge & more.'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05070c' },
    { media: '(prefers-color-scheme: light)', color: '#05070c' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${brand.name}`,
  },
  description: defaultDescription,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: siteUrl }],
  creator: brand.name,
  publisher: brand.legalName,
  category: 'automotive',
  keywords: siteKeywords,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: brand.shortName,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/images/logo-256.png', sizes: '256x256', type: 'image/png' }],
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: brand.locale,
    url: siteUrl,
    siteName: brand.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/images/bg-challenger.jpg',
        width: 1280,
        height: 720,
        alt: `${brand.name} — premium auto detailing in ${brand.city}, ${brand.stateCode}`,
        type: 'image/jpeg',
      },
      {
        url: '/images/logo.png',
        width: 493,
        height: 495,
        alt: `${brand.name} neon logo`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} | Auto Detailing ${brand.city} ${brand.stateCode}`,
    description: defaultDescription,
    images: ['/images/bg-challenger.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'geo.region': 'US-MA',
    'geo.placename': brand.city,
    'geo.position': '42.4084;-71.0537',
    ICBM: '42.4084, -71.0537',
    'business:contact_data:locality': brand.city,
    'business:contact_data:region': brand.stateCode,
    'business:contact_data:country_name': brand.country,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = buildSiteStructuredData()

  return (
    <html
      lang={brand.language}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <div className="site-bg" aria-hidden="true">
          <div className="site-bg-image" />
          <div className="site-bg-veil" />
        </div>
        <ScrollProgress />
        <JsonLd data={structuredData} />
        <Header />
        {children}
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  )
}
