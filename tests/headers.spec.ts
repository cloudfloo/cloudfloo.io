import { test, expect } from '@playwright/test';
import config from '../next.config.js';

test('headers configuration', async () => {
  const headers = config.customHeaders;
  const linkRule = headers.find(h => h.source === '/:path*');
  expect(linkRule).toBeDefined();
  expect(linkRule!.headers[0].key).toBe('Link');
  expect(linkRule!.headers[0].value).toContain('https://images.pexels.com');
});
