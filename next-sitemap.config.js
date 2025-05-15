/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://eggsontime.app',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    return [
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