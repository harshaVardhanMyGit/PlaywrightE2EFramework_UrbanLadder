import { test, expect } from '@playwright/test';

test('Scroll to Explore Our Furniture Range and click first visible Bookshelves button', async ({ page }) => {
  // 1. Navigate to Urban Ladder
  await page.goto('https://www.urbanladder.com/', { waitUntil: 'domcontentloaded' });

  // 2. Scroll to and check for the 'Explore Our Furniture Range' text visibility
  const exploreText = page.locator('text=Explore Our Furniture Range');
  await exploreText.scrollIntoViewIfNeeded();
  await expect(exploreText).toBeVisible();

  // 3. Click on the first visible 'Bookshelves' button on the page
  const bookshelvesLinks = page.locator('a:has-text("Bookshelves")');
  const count = await bookshelvesLinks.count();
  let clicked = false;
  for (let i = 0; i < count; i++) {
    const link = bookshelvesLinks.nth(i);
    if (await link.isVisible()) {
      await link.scrollIntoViewIfNeeded();
      await link.click();
      clicked = true;
      break;
    }
  }
  expect(clicked).toBeTruthy();

  // 4. Test ends, browser will close automatically
});

