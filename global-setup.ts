import { chromium, type FullConfig } from '@playwright/test';//chromium Playwright ka built-in browser object hai.Iska use Chrome/Chromium browser launch karne ke liye hota hai.
import dotenv from 'dotenv';// dotenv external npm package hai jo .env file ko read karke values process.env me load karta hai.
import { existsSync } from 'fs';// existsSync Node.js fs(File System) module ka function hai, File exist karti hai ya nahi check karta hai.
 

if (existsSync('.env')) {
  dotenv.config();//config() dotenv package ka built-in method hai jo .env file ko read karke values process.env me load karta hai.
}

async function globalSetup(config: FullConfig) {
//👇👇process.env object se URL, EMAIL aur PASSWORD environment variables nikal kar local variables me store kar rahe hain aur URL 
// ko baseURL naam de rahe hain👇👇
  const baseURL = process.env.URL;
  const EMAIL = process.env.EMAIL;
  const PASSWORD = process.env.PASSWORD;


  if (!baseURL || !EMAIL || !PASSWORD) {
    throw new Error('URL, EMAIL, and PASSWORD environment variables are required for global setup. Set them in .env or export them in CI.');
  }
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(baseURL + '/index.php?route=account/login');
  await page.fill('#input-email', EMAIL);
  await page.fill('#input-password', PASSWORD);
  await page.click('input[type="submit"][value="Login"]');
  await page.waitForURL('**/index.php?route=account/account');

  // Save the authenticated browser state for test reuse.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;// Is file ke globalSetup function ko Playwright ke liye export kar rahe hain.
// Playwright isi function ko test start hone se pehle execute karega.

