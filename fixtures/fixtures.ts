import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';
import { RegisterPage } from '../pages/register_page';

type MyFixtures = {
homePage: HomePage;
loginPage: LoginPage;
loggedInPage: Page;
registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({   //extend = Playwright के default test में extra features (fixtures) add करना

homePage: async ({ page }, use) => {            //use = current running test को data देना
await use(new HomePage(page));
},

loginPage: async ({ page }, use) => {
await use(new LoginPage(page));
},
registerPage: async ({ page }, use) => {
await use(new RegisterPage(page));
},

// 🔥 AUTO LOGIN FIXTURE
loggedInPage: async ({ page }, use) => {
  await page.goto('index.php?route=account/account');
  await use(page);
}

});
