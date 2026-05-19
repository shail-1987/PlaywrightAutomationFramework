import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { AccountPage } from '../pages/account_page';
import { AddressBookPage } from '../pages/address_book_page';

const accountRoute = 'index.php?route=account/account';

test.describe('@smoke Address book page tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
  });

  test('should display the address book link on My Account page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await expect(accountPage.addressBookLink).toBeVisible();
  });

  test('should navigate to address book page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openAddressBook();

    const addressBookPage = new AddressBookPage(loggedInPage);
    await addressBookPage.expectPage();
  });
});

test.describe('@sanity Address book functional tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openAddressBook();
  });

  test('should display the address book heading', async ({ loggedInPage }) => {
    const addressBookPage = new AddressBookPage(loggedInPage);
    await addressBookPage.expectPage();
  });

  test('should display the New Address action on address book page', async ({ loggedInPage }) => {
    const addressBookPage = new AddressBookPage(loggedInPage);
    await expect(addressBookPage.newAddressButton).toBeVisible();
  });
});
