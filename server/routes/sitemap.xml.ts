import { products } from '../../app/data/products'

export default defineEventHandler((event) => {
  const origin = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  const pagePaths = ['/aiInterview', '/aiResume', '/aiproposition', '/antiCheating', '/computerService', '/contact', '/escort', '/hr', '/', '/marking', '/niupai', '/onlineTest', '/paperlessInterview', '/personexam', '/privacy', '/product', '/publicemployment', '/question', '/questionBank', '/questionBank/index1', '/scoreAnalysis', '/skillCert']
  const urls = [...new Set([...pagePaths, ...products.map(product => `/products/${product.slug}`)])].sort()
  const escapeXml = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!)
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc><changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`
})
