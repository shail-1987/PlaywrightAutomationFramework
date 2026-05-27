import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { AccountPage } from '../pages/account_page';
import { EditAccountPage } from '../pages/edit_account_page';

const accountRoute = 'index.php?route=account/account';

test.describe('@smoke Account information page tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
  });

  test('should display the My Account heading after login', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.expectAccountPage();
  });

  test('should show edit account information link', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await expect(accountPage.editAccountLink).toBeVisible();
  });
});

test.describe('@sanity Account information functional tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
  });

  test('should open edit account information page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openEditAccount();

    const editAccountPage = new EditAccountPage(loggedInPage);
    await editAccountPage.expectPage();
    await expect(editAccountPage.firstNameInput).toBeVisible();
    await expect(editAccountPage.emailInput).toBeVisible();
  });

  test('should keep account information form visible on edit page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openEditAccount();

    const editAccountPage = new EditAccountPage(loggedInPage);
    await expect(editAccountPage.continueButton).toBeVisible();
  });
});
//Changes should trigger pipeline anothet
