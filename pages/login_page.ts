import { expect, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;
  readonly returningCustomerHeading;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#input-email');
    this.passwordInput = page.locator('#input-password');
    this.loginButton = page.locator('input[type="submit"][value="Login"]');
    this.returningCustomerHeading = page.locator('h2', { hasText: 'Returning Customer' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.returningCustomerHeading).toBeVisible();
  }
}
