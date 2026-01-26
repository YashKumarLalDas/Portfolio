/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yashkumarlaldas.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}