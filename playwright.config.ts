import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv'; 
import { existsSync } from 'fs';

if (existsSync('.env')) {
  dotenv.config();
}
const baseURL = process.env.URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

/*
const isCI एक boolean variable है जो check करता है कि framework local machine पर run हो रहा है या CI/CD pipeline (Azure/Jenkins/GitHub Actions) में। 

अगर isCI = false → channel = 'chrome'
तो actual Google Chrome browser open होगा।

अगर isCI = true → channel = undefined
तो Playwright अपना default bundled Chromium browser use करेगा।

यह इसलिए use किया जाता है क्योंकि CI servers में mostly real Chrome installed नहीं होता।
*/
const isCI = process.env.CI === 'true' || process.env.CI === '1' || Boolean(process.env.CI);

if (!baseURL) {
  throw new Error('URL environment variable is not set. Please set URL in the .env file or export it in CI.');
}
if (!email) {
  throw new Error('EMAIL environment variable is not set. Please set EMAIL in the .env file or export it in CI.');
}
if (!password) {
  throw new Error('PASSWORD environment variable is not set. Please set PASSWORD in the .env file or export it in CI.');
}

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  workers: 3,
  fullyParallel: true,
  reporter: [
  ['list'],
  ['html', { open: 'never' }],
  ['junit', { outputFile: 'results.xml' }],
  ['allure-playwright']
],
  globalSetup: require.resolve('./global-setup'),// Test execution se pehle global-setup.ts file run karne ke liye
  use: {
    baseURL,
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
       // channel: isCI ? undefined : 'chrome',
       channel:undefined,
      },
    },
  ],
});

