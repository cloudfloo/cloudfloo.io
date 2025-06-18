module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: ['/index.html'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': 'off', // PWA not required for this project
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
