import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { AccountPage } from '../pages/account_page';
import { ChangePasswordPage } from '../pages/change_password_page';

const accountRoute = 'index.php?route=account/account';

test.describe('@smoke Change password page tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
  });

  test('should display change password link on My Account page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await expect(accountPage.changePasswordLink).toBeVisible();
  });

  test('should navigate to change password page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openChangePassword();

    const passwordPage = new ChangePasswordPage(loggedInPage);
    await passwordPage.expectPage();
  });
});

test.describe('@sanity Change password functional tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openChangePassword();
  });

  test('should display change password fields', async ({ loggedInPage }) => {
    const passwordPage = new ChangePasswordPage(loggedInPage);
    await expect(passwordPage.passwordInput).toBeVisible();
    await expect(passwordPage.confirmPasswordInput).toBeVisible();
  });

  test('should display continue button on change password page', async ({ loggedInPage }) => {
    const passwordPage = new ChangePasswordPage(loggedInPage);
    await expect(passwordPage.continueButton).toBeVisible();
  });
});
