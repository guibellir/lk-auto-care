# LK Auto Care

Premium auto detailing website for **LK Auto Care** — based in **Everett, MA**, serving Greater Boston.

Built with **Next.js** (App Router) + React 19 + TypeScript.

## Stack

- Next.js 15 (App Router, SSR/SSG for SEO)
- React 19 + TypeScript
- next/font (Inter + Space Grotesk)
- JSON-LD LocalBusiness, metadata API, `sitemap.ts`, `robots.ts`
- Vercel-ready

## Services

- Interior & exterior auto detailing
- Paint correction & polishing
- LED headlight conversion
- Exhaust system replacement
- Engine remap / ECU tuning

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Brand / contact

Edit `src/data/brand.ts` for phone, WhatsApp, Instagram, email, service areas, and FAQ.

## Logo

`public/images/logo.png` — neon mark. Replace with a transparent PNG anytime.
