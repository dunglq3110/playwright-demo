// @ts-check
import { test, expect } from '@playwright/test';

  async function ensureDateVisible(targetDate, page) {
    while (true) {
      // get first visible date in calendar
      const firstDate = await page
        .locator('[data-selenium-date]')
        .first()
        .getAttribute('data-selenium-date');

      if (!firstDate) throw new Error('Cannot read calendar');

      const first = new Date(firstDate);
      const target = new Date(targetDate);

      const firstMonth = first.getFullYear() * 12 + first.getMonth();
      const targetMonth = target.getFullYear() * 12 + target.getMonth();

      if (firstMonth === targetMonth) break;

      if (firstMonth > targetMonth) {
        // go back
        await page.locator('[aria-label="Previous Month"]').click();
      } else {
        // go forward
        await page.locator('[aria-label="Next Month"]').click();
      }
    }
  }

  
test('test', async ({ page }) => {
  await page.goto('https://www.agoda.com');

  await page.getByPlaceholder('Enter a destination or property')
    .fill('Muong Thanh Saigon Centre Hotel');

  await page.locator('body').click();

  const formatDate = (date) => date.toISOString().split('T')[0]; //ádasdasdasd

  const today = new Date();

  await page.locator(`[data-selenium-date="${formatDate(today)}"]`).first().click();

  await page.pause();
  await page.locator('body').click();
  await page.pause();
  await page.locator('body').click();
  
  const datePlus2 = new Date(today);
  datePlus2.setDate(today.getDate() + 2);

  const datePlus3 = new Date(today);
  datePlus3.setDate(today.getDate() + 3);

  const d2 = formatDate(datePlus2);
  const d3 = formatDate(datePlus3);

  // ensure month is correct
  await ensureDateVisible(d2, page);

  // click dates
  await page.locator(`[data-selenium-date="${d2}"]`).first().click();
  await page.locator(`[data-selenium-date="${d3}"]`).first().click();

  await page.pause();
});

test.describe('test2', () => {
  test('test2', async ({ page }) => {
    await page.goto('https://www.agoda.com');   
    await page.getByPlaceholder('Enter a destination or property')
      .fill('Centre Hotel');
  });
}