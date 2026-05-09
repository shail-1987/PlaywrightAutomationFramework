import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!baseURL) {
  throw new Error('URL environment variable is not set. Please set URL in the .env file.');
}
if (!email) {
  throw new Error('EMAIL environment variable is not set. Please set EMAIL in the .env file.');
}
if (!password) {
  throw new Error('PASSWORD environment variable is not set. Please set PASSWORD in the .env file.');
}

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL,
    storageState: 'storageState.json',
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        ...(process.env.CI
          ? { headless: true }
          : { channel: 'chrome', headless: false }),
      },
    },
  ],
});
