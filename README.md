# LK Auto Care

Premium auto detailing website for **LK Auto Care** — based in **Everett, MA**, serving Greater Boston.

Built with **Next.js** (App Router) + React 19 + TypeScript. Ready for **Vercel**.

## Stack

- Next.js 15 (App Router, static generation for SEO)
- React 19 + TypeScript
- `next/font` (Inter + Space Grotesk)
- JSON-LD LocalBusiness, Metadata API, `sitemap.ts`, `robots.ts`
- Node **20+** (see `.nvmrc`)

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

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended on production | Canonical URL, no trailing slash (e.g. `https://lkautocare.com`). Used for OG tags, canonical, sitemap, JSON-LD. |
| `WEB3FORMS_ACCESS_KEY` | Required for contact form | Free access key from [web3forms.com](https://web3forms.com). Form submissions are emailed to the address you register (e.g. `hello@lkautocare.com`). 250 leads / month on free plan. |

If unset on Vercel, the app uses `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` automatically.

### Contact form (free email leads)

The contact form posts to `/api/contact`, which sends the lead via **Web3Forms** (no paid SMS, no client email app).

1. Go to [web3forms.com](https://web3forms.com) → create free access key with the shop email.
2. Confirm that email in your inbox.
3. Set `WEB3FORMS_ACCESS_KEY` in `.env.local` (local) and Vercel → Environment Variables (production).
4. Redeploy. Submit a test lead and check the inbox (and spam folder once).

## Deploy on Vercel

### Option A — GitHub (recommended)

1. Push this repo to GitHub (already: `guibellir/lk-auto-care`).
2. Go to [vercel.com/new](https://vercel.com/new).
3. **Import** the repository.
4. Framework Preset: **Next.js** (auto-detected).
5. Root Directory: leave default (repo root).
6. Build Command: `next build` (default).
7. Output: leave default (Next.js handles it).
8. Environment Variables → add for **Production**:
   - `NEXT_PUBLIC_SITE_URL` = `https://lkautocare.com`  
     (or your `*.vercel.app` URL until the custom domain is live)
   - `WEB3FORMS_ACCESS_KEY` = your free key from [web3forms.com](https://web3forms.com)
9. Click **Deploy**.

### Option B — CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

### Custom domain

1. Vercel → Project → **Settings → Domains**
2. Add `lkautocare.com` (and `www` if desired)
3. Set DNS as Vercel instructs
4. Update `NEXT_PUBLIC_SITE_URL` to `https://lkautocare.com` and redeploy

### After deploy checklist

- [ ] Homepage loads on the Vercel URL
- [ ] Phone CTA opens dialer: `(774) 810-9849`
- [ ] Instagram → [instagram.com/lkautocare7](https://www.instagram.com/lkautocare7/)
- [ ] Contact form sends a lead email (Web3Forms key set; check inbox + spam)
- [ ] `/sitemap.xml` and `/robots.txt` return 200
- [ ] Mobile menu + sticky Call/Book bar work on iPhone Safari

## Brand / contact

Single source of truth: `src/data/brand.ts`

- Phone, email, Instagram
- Service areas & FAQ
- Business copy

## Assets

Web-optimized images live in `public/images/`.  
Raw client drops stay local in `Fotos /` (gitignored).
