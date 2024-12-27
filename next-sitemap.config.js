module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN_URL,
  generateRobotsTxt: true,
  sitemapSize: 50000,
  exclude: ['/admin', '/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/services-sitemap.xml`,
    ],
  }, 
}
