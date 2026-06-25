import { test } from '../fixtures/fixtures';
import loginData from '../test_data/login_data.json';
import {expect} from '@playwright/test'

test('should login successfully and open account page',async ({ homePage, loginPage, accountPage }) => {

    await homePage.navigateToHomePage();

    await homePage.openLogin();

    await loginPage.login(
        loginData.validUser.email,
        loginData.validUser.password
    );
    await expect(accountPage.page).toHaveURL("https://naveenautomationlabs.com/opencart/index.php?route=account/account");

});