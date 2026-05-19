import { expect, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class EditAccountPage extends BasePage {
  readonly pageHeading;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly telephoneInput;
  readonly continueButton;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1', { hasText: 'My Account Information' });
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.continueButton = page.locator('input[type="submit"][value="Continue"]');
  }

  async expectPage(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
