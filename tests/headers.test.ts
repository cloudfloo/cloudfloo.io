import config from '../next.config.js';

test('headers configuration', async () => {
  const headers = await config.headers();
  const linkRule = headers.find(h => h.source === '/:path*');
  expect(linkRule.headers[0].key).toBe('Link');
  expect(linkRule.headers[0].value).toContain('https://images.pexels.com');
});
