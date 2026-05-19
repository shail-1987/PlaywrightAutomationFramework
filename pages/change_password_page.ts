import { expect, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class ChangePasswordPage extends BasePage {
  readonly pageHeading;
  readonly passwordInput;
  readonly confirmPasswordInput;
  readonly continueButton;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1', { hasText: 'Change Password' });
    this.passwordInput = page.locator('#input-password');
    this.confirmPasswordInput = page.locator('#input-confirm');
    this.continueButton = page.locator('input[type="submit"][value="Continue"]');
  }

  async expectPage(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
