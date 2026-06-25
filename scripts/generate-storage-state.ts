/*
 * Yeh script users.json se sabhi test users uthati hai
 * aur har user ke liye authenticated storage state generate karti hai.
 *
 * Fayde:
 * 1. Login baar-baar execute nahi hota.
 * 2. Parallel execution mein session conflict nahi hota.
 * 3. Har worker ko alag authenticated session milta hai.
 */

import { chromium } from '@playwright/test';
import users from '../test_data/users.json';

(async () => {
    for (let i = 0; i < users.length; i++) {

        const browser = await chromium.launch();
        const page = await browser.newPage();

        await page.goto("https://naveenautomationlabs.com/opencart/");

        // Home → Login
        await page.locator('a[title="My Account"]').click();
        await page.locator('text=Login').click();

        // Login
        await page.locator('#input-email').fill(users[i].email);
        await page.locator('#input-password').fill(users[i].password);
        await page.locator('input[value="Login"]').click();

        // Storage state save karo
        await page.context().storageState({
            path: `.auth/user${i + 1}.json`
        });

        console.log(`User ${i + 1} storage state generated`);

        await browser.close();
    }
})();