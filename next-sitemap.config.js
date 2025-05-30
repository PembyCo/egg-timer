/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://eggsontime.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async () => {
    return [
      {
        loc: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: '/legal/terms',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        loc: '/legal/privacy',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      },
    ];
  },
} 