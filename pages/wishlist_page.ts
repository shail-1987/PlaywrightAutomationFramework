import { expect, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class WishlistPage extends BasePage {
  readonly pageHeading;
  readonly contentContainer;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h2', { hasText: 'My Wish List' });
    this.contentContainer = page.locator('#content');
  }

  async expectPage(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
