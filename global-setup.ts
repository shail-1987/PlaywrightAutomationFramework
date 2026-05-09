import { chromium, type FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const { URL: baseURL, EMAIL, PASSWORD } = process.env;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const loginUrl = new URL('index.php?route=account/login', baseURL).toString();

  await page.goto(loginUrl);
  await page.fill('#input-email', EMAIL);
  await page.fill('#input-password', PASSWORD);
  await page.click('input[type="submit"][value="Login"]');
  await page.waitForURL('**/index.php?route=account/account');

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
