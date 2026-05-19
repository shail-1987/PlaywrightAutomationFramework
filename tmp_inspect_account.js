const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: 'storageState.json' });
  const page = await context.newPage();
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
  console.log('account URL', page.url());
  const links = ['edit', 'password', 'address', 'wishlist'];
  for (const href of links) {
    const els = await page.locator(`#column-right a[href*="route=account/${href}"]`).allTextContents();
    console.log(href, els);
  }
  console.log('h1', await page.locator('h1').allTextContents());
  console.log('h2', await page.locator('h2').allTextContents());
  await page.click('#column-right a[href*="route=account/address"]');
  console.log('address h1', await page.locator('h1').allTextContents());
  console.log('address h2', await page.locator('h2').allTextContents());
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
  await page.click('#column-right a[href*="route=account/wishlist"]');
  console.log('wishlist h1', await page.locator('h1').allTextContents());
  console.log('wishlist h2', await page.locator('h2').allTextContents());
  await browser.close();
})();
