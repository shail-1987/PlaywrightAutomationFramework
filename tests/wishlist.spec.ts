import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { AccountPage } from '../pages/account_page';
import { WishlistPage } from '../pages/wishlist_page';

const accountRoute = 'index.php?route=account/account';

test.describe('@smoke Wishlist page tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
  });

  test('should display the wishlist link on My Account page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await expect(accountPage.wishlistLink).toBeVisible();
  });

  test('should navigate to wishlist page', async ({ loggedInPage }) => {
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openWishlist();

    const wishlistPage = new WishlistPage(loggedInPage);
    await wishlistPage.expectPage();
  });
});

test.describe('@sanity Wishlist functional tests', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    await loggedInPage.goto(accountRoute);
    const accountPage = new AccountPage(loggedInPage);
    await accountPage.openWishlist();
  });

  test('should display the wishlist heading', async ({ loggedInPage }) => {
    const wishlistPage = new WishlistPage(loggedInPage);
    await wishlistPage.expectPage();
  });

  test('should keep wishlist container visible', async ({ loggedInPage }) => {
    const wishlistPage = new WishlistPage(loggedInPage);
    await expect(wishlistPage.contentContainer).toBeVisible();
  });
});
