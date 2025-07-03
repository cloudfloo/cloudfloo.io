/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://cloudfloo.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/services'),
    await config.transform(config, '/services/ai-ml'),
    await config.transform(config, '/services/cloud-solutions'),
    await config.transform(config, '/services/devops'),
    await config.transform(config, '/services/data-engineering'),
    await config.transform(config, '/services/app-development'),
    await config.transform(config, '/services/edge-computing'),
    await config.transform(config, '/team'),
    await config.transform(config, '/team/michal-wiatr'),
    await config.transform(config, '/team/sebastian-debicki'),
    await config.transform(config, '/team/damian-ogrodnik'),
    await config.transform(config, '/legal/gdpr'),
    await config.transform(config, '/legal/privacy'),
    await config.transform(config, '/legal/terms'),
    await config.transform(config, '/legal/cookies'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://cloudfloo.io/sitemap.xml',
    ],
  },
} 