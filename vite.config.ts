import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Resolve the public site URL for deploy (Vercel) or local.
 * Priority: VITE_SITE_URL → Vercel production domain → deploy URL → fallback.
 */
function resolveSiteUrl(env: Record<string, string>): string {
  const explicit = env.VITE_SITE_URL || process.env.VITE_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const production =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_PROJECT_PRODUCTION_URL
  if (production) {
    const host = production.replace(/^https?:\/\//, '')
    return `https://${host}`
  }

  const vercelUrl = process.env.VERCEL_URL || env.VERCEL_URL
  if (vercelUrl) {
    const host = vercelUrl.replace(/^https?:\/\//, '')
    return `https://${host}`
  }

  return 'https://lkautocare.com'
}

function seoFilesPlugin(siteUrl: string): Plugin {
  return {
    name: 'lk-auto-care-seo-files',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')

      writeFileSync(
        resolve(outDir, 'robots.txt'),
        [
          '# https://www.robotstxt.org/robotstxt.html',
          'User-agent: *',
          'Allow: /',
          '',
          `Sitemap: ${siteUrl}/sitemap.xml`,
          '',
        ].join('\n'),
        'utf8',
      )

      const today = new Date().toISOString().slice(0, 10)
      const urls = [
        {
          loc: `${siteUrl}/`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '1.0',
        },
        {
          loc: `${siteUrl}/services`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.9',
        },
        {
          loc: `${siteUrl}/areas`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.8',
        },
      ]

      const urlXml = urls
        .map(
          (u) =>
            [
              '  <url>',
              `    <loc>${u.loc}</loc>`,
              `    <lastmod>${u.lastmod}</lastmod>`,
              `    <changefreq>${u.changefreq}</changefreq>`,
              `    <priority>${u.priority}</priority>`,
              '  </url>',
            ].join('\n'),
        )
        .join('\n')

      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          urlXml,
          '</urlset>',
          '',
        ].join('\n'),
        'utf8',
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env)

  process.env.VITE_SITE_URL = siteUrl

  return {
    plugins: [react(), seoFilesPlugin(siteUrl)],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      target: 'es2020',
      chunkSizeWarningLimit: 1200,
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
    server: {
      port: 5173,
      strictPort: false,
    },
  }
})
