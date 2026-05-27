import { defineConfig } from '@playwright/test';

//👇👇👇NodeJS pura dotenv package memory(RAM) me load karta hai, dotenv ek object return karta hai jisme kai sare methods and functions hote hai 
//jaise dotenv.config(), dotenv.parse(), dotenv.populate()
import dotenv from 'dotenv'; 
import { existsSync } from 'fs';

/*
dotenv ek pakage/module/object hai jo npm package se aata hai ye wahi npm package hai jo humne package.json me install kiya hai

👇it means go to module/package named ‘fs’ and import existSync function from it
note:👇existsSync() ek function hai jo check karta “kya ye file ya folder exist karta hai ya nahi” and remember here ‘fs’ is not a variable.

*/
if (existsSync('.env')) {
  dotenv.config();//.config() ka kaam hai ki .env file read karo or variables ko process.env me dal do.
}


/*
👇👇👇👇👇Understanding this
process is a global object provided by node.js and env and URL is the properties inside object
for understanding: 
process = {
  env: {
    URL: ' https://example.com '
    UserName:const 
  }
}

 */
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

// The baseURL is assigned to Playwright so page.goto('') resolves to the app home page.
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  workers: 5,
  fullyParallel: true,
  reporter: [
  ['list'],
  ['html', { open: 'never' }],
  ['junit', { outputFile: 'results.xml' }]
],
  globalSetup: require.resolve('./global-setup'),//
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
        headless: true,
       // channel: isCI ? undefined : 'chrome',
       channel:undefined,
      },
    },
  ],
});
