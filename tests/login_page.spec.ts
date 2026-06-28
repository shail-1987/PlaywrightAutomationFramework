import {test} from '../fixtures/fixtures';
import {expect} from '@playwright/test'
import login_data from '../test_data/login_data.json'


test('should open the login page from the home page', async ({ homePage,loginPage }) => {
  await homePage.navigateToHomePage();
  await expect(homePage.page).toHaveURL("https://naveenautomationlabs.com/opencart/");
  await homePage.openLogin();
  await expect(homePage.page).toHaveURL(/account\/login/)
  await loginPage.login(login_data.validUser.email,login_data.validUser.password);
  console.log("===========welcome to account page=============")
});
