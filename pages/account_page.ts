import { expect, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class AccountPage extends BasePage {
  readonly accountHeading;
  readonly editAccountLink;
  readonly changePasswordLink;
  readonly addressBookLink;
  readonly wishlistLink;

  constructor(page: Page) {
    super(page);
    this.accountHeading = page.locator('h2', { hasText: 'My Account' });
    this.editAccountLink = page.locator('#column-right').getByRole('link', { name: 'Edit Account', exact: true });
    this.changePasswordLink = page.locator('#column-right').getByRole('link', { name: 'Password', exact: true });
    this.addressBookLink = page.locator('#column-right').getByRole('link', { name: 'Address Book', exact: true });
    this.wishlistLink = page.locator('#column-right').getByRole('link', { name: 'Wish List', exact: true });
  }

  async expectAccountPage(): Promise<void> {
    await expect(this.accountHeading).toBeVisible();
  }

  async openEditAccount(): Promise<void> {
    await this.editAccountLink.click();
  }

  async openChangePassword(): Promise<void> {
    await this.changePasswordLink.click();
  }

  async openAddressBook(): Promise<void> {
    await this.addressBookLink.click();
  }

  async openWishlist(): Promise<void> {
    await this.wishlistLink.click();
  }
}
