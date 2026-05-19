import { expect, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class AddressBookPage extends BasePage {
  readonly pageHeading;
  readonly newAddressButton;
  readonly contentContainer;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h2', { hasText: 'Address Book Entries' });
    this.newAddressButton = page.locator('text=New Address');
    this.contentContainer = page.locator('#content');
  }

  async expectPage(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
