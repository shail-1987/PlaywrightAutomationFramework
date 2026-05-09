import { chromium, type FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Load local env values if a .env file exists.
if (existsSync('.env')) {
  dotenv.config();
}

async function globalSetup(config: FullConfig) {
  const { URL: baseURL, EMAIL, PASSWORD } = process.env;

  if (!baseURL || !EMAIL || !PASSWORD) {
    throw new Error('URL, EMAIL, and PASSWORD environment variables are required for global setup. Set them in .env or export them in CI.');
  }

  // Normalize base URL to ensure relative URL resolution works consistently.
  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const loginUrl = new URL('index.php?route=account/login', normalizedBaseURL).toString();

  await page.goto(loginUrl);
  await page.fill('#input-email', EMAIL);
  await page.fill('#input-password', PASSWORD);
  await page.click('input[type="submit"][value="Login"]');
  await page.waitForURL('**/index.php?route=account/account');

  // Save the authenticated browser state for test reuse.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
