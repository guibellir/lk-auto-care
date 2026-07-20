# LK Auto Care

Premium auto detailing and performance-minded upgrades website for **LK Auto Care** — based in **Everett, MA**, serving Greater Boston.

## Stack

- Vite + React 19 + TypeScript
- React Router
- SEO: meta tags, Open Graph, JSON-LD (LocalBusiness), sitemap, robots
- Vercel-ready (`vercel.json`)

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

```bash
npm run build
npm run preview
```

## Environment

Copy `.env.example` → `.env` (optional):

```
VITE_SITE_URL=https://your-domain.com
```

On Vercel, production URL is resolved automatically if `VITE_SITE_URL` is not set.

## Brand / contact

Edit `src/data/brand.ts` for:

- Phone / WhatsApp / Instagram / email  
- Service areas (add cities anytime)  
- FAQ and service copy  

## Logo

Place brand assets in `public/images/logo.png`. Current logo is the neon sign mark (brick backdrop). A transparent PNG can replace it later without code changes.
