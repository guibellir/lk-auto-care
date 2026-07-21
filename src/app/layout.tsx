import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { JsonLd } from '@/components/JsonLd'
import { brand, getSiteUrl, siteKeywords } from '@/data/brand'
import { buildStructuredData } from '@/seo/structuredData'
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
    default: `${brand.name} | Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
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
    icon: '/favicon.png',
    apple: '/images/logo-256.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: brand.locale,
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} | Premium Auto Detailing in ${brand.city}, ${brand.stateCode}`,
    description:
      'Interior & exterior detailing, polishing, LED headlights, exhaust & engine remap. Based in Everett — serving Greater Boston.',
    images: [
      {
        url: '/images/logo.png',
        width: 493,
        height: 495,
        alt: 'LK Auto Care neon logo — premium auto care Boston',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} | Premium Auto Detailing Everett MA`,
    description:
      'Detailing, polish, LED, exhaust & remap in Everett and Greater Boston.',
    images: ['/images/logo.png'],
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
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = buildStructuredData()

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
