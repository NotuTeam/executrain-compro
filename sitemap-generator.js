import { writeFileSync } from 'fs';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://excelearn.example.com';

const staticPages = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/product', changefreq: 'weekly', priority: 0.9 },
  { path: '/schedule', changefreq: 'weekly', priority: 0.8 },
  { path: '/service', changefreq: 'monthly', priority: 0.8 },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(page => {
    return `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log('✓ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
