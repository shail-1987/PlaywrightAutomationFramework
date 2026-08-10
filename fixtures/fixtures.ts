import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';
import {AccountPage} from '../pages/accountPage'


type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage:AccountPage;
  loggedInPage: Page;
  
};
export const test = base.extend<MyFixtures>({
  // Extend the default Playwright test with custom page objects.
  homePage: async ({ page }, use) => {  
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {

    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {

    await use(new AccountPage(page));
  },
  

loggedInPage: async ({ browser }, use) => {
  const context = await browser.newContext({ storageState:'storageState.json'});
  const page = await context.newPage();
  await page.goto('index.php?route=account/account');
  await use(page);
  await context.close();
},

//for multiple users👇👇

/*
loggedInPage: async ({ browser }, use, testInfo) => {
    const workerIndex = testInfo.workerIndex;

    const storageFiles = [
        '.auth/user1.json',
        '.auth/user2.json',
        '.auth/user3.json',
    ];

    const assignedUser =
        storageFiles[workerIndex % storageFiles.length];

    const context = await browser.newContext({
        storageState: assignedUser,
    });

    const page = await context.newPage();

    await page.goto('index.php?route=account/account');

    await use(page);

    await context.close();
},
*/
 
});
