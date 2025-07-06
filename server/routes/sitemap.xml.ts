export default defineEventHandler(async (event) => {
  const routes = await $fetch('/api/sitemap.xml')
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route: any) => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})