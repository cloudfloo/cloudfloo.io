import { test, expect } from '@playwright/test';

const waitForCanvas = async (page) => {
  await page.waitForSelector('canvas', { timeout: 5000 });
};

test.describe('Immersive Cloud Visualization', () => {
  test('loads after scroll when motion allowed', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollBy(0, 400));
    await waitForCanvas(page);
  });

  test('does not load when prefers reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(1000);
    const canvas = await page.$('canvas');
    expect(canvas).toBeNull();
  });
});
