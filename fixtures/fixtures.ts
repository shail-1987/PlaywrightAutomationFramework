import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';
import { RegisterPage } from '../pages/register_page';
//👇here fixtures(homePage,loginPage..etc) are assigned to a type object MyFixtures thats why we used = here
//note: this is a type assignment process not value assignment
type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  loggedInPage: Page;
  registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
  // Extend the default Playwright test with custom page objects.


  homePage: async ({ page }, use) => {  
    await use(new HomePage(page));
  },
  

  loginPage: async ({ page }, use) => {

    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  // Authenticated fixture: use storageState only for tests that need a signed-in user.
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'storageState.json' });
    /*☝️Context: when we launch chrome then there is possibility that we can open normaal profile, guest profile or incognito so these
      seprate session/profile is called context.
    simple terms👉 Browser Context= seprate browser session{it contains cookies,login session,local storage,cache}
    */
    const page = await context.newPage();
    await page.goto('index.php?route=account/account');
    await use(page);
    await context.close();
  },
});
