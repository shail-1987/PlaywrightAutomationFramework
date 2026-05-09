import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe('OpenCart Chrome login page test', () => { //test.describe() related test cases ko ek group me organize karta hai..

test('login to OpenCart with valid credentials', async ({ loggedInPage }) => {

let exp_url=await loggedInPage.url();
console.log("This is my URL:👉" ,exp_url);
await expect(loggedInPage).toHaveURL(/naveenautomationlabs/);


await expect(
loggedInPage.locator('h2', { hasText: 'My Account' })
).toBeVisible();

});


});
