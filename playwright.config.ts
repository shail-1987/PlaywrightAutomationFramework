import { defineConfig } from '@playwright/test';

const baseURL = process.env.URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

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
