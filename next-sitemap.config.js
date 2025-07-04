/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://cloudfloo.io',
  // Output sitemaps to the static export directory so they are
  // included in the final Docker image served by nginx
  outDir: './out',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  exclude: ['/draft/*'],
  // Enable alternate language references for bilingual SEO
  alternateRefs: [
    {
      href: 'https://cloudfloo.io',
      hreflang: 'pl',
    },
    {
      href: 'https://cloudfloo.io/en',
      hreflang: 'en',
    },
    {
      href: 'https://cloudfloo.io',
      hreflang: 'x-default',
    },
  ],
  
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];
    
    // Team member pages
    const teamMembers = [
      'michal-wiatr',
      'sebastian-debicki', 
      'damian-ogrodnik'
    ];
    
    teamMembers.forEach(slug => {
      result.push({
        loc: `/team/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Service pages
    const services = [
      'cloud-solutions',
      'ai-ml',
      'devops',
      'data-engineering',
      'app-development',
      'edge-computing'
    ];
    
    services.forEach(service => {
      result.push({
        loc: `/services/${service}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Company pages
    const companyPages = [
      'careers',
      'blog',
      'press'
    ];
    
    companyPages.forEach(page => {
      result.push({
        loc: `/company/${page}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Legal pages
    const legalPages = [
      'privacy',
      'terms',
      'cookies',
      'gdpr'
    ];
    
    legalPages.forEach(page => {
      result.push({
        loc: `/legal/${page}`,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  },
  
  // Custom robots.txt rules
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/draft/*']
      },
      {
        userAgent: 'GPTBot',
        disallow: '/'
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/'
      },
      {
        userAgent: 'CCBot',
        disallow: '/'
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/'
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/'
      }
    ],
    additionalSitemaps: [
      'https://cloudfloo.io/sitemap.xml'
    ]
  },
  
  // Transform function to customize URLs
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/services': { priority: 0.9, changefreq: 'weekly' },
      '/team': { priority: 0.9, changefreq: 'monthly' },
      '/company/careers': { priority: 0.8, changefreq: 'weekly' },
      '/company/blog': { priority: 0.8, changefreq: 'daily' },
    };
    
    const customSettings = customConfig[path] || {};
    
    return {
      loc: path,
      changefreq: customSettings.changefreq || config.changefreq,
      priority: customSettings.priority || config.priority,
      lastmod: new Date().toISOString(),
    };
  }
};
