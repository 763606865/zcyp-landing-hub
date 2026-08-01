import { products } from '../../app/data/products'

export default defineEventHandler((event) => {
  const origin = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  const urls = ['/', ...products.map(product => `/products/${product.slug}`)]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `  <url><loc>${origin}${path}</loc><changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`
})
