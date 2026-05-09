import { BasePage } from './base_page';
import type { Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly searchInput;
  readonly searchButton;
  readonly accountMenu;
  readonly loginLink;
  readonly registerLink;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('button[type="button"][class*=\"btn-default\"]');
    this.accountMenu = page.locator('a[title="My Account"]');
    this.loginLink = page.locator('text=Login');
    this.registerLink = page.locator('a[href*="route=account/register"]');
  }

  async navigate(): Promise<void> {
    // Navigate to the configured app URL.
    await this.goto('');
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async openLogin(): Promise<void> {
    // Open the My Account dropdown and click on Login.
    await this.accountMenu.click();
    await this.loginLink.click();
  }

  async openRegister(): Promise<void> {
    // Open the My Account dropdown and click Register if visible.
    await this.accountMenu.waitFor({ state: 'visible', timeout: 10000 });
    await this.accountMenu.click();

    const registerVisible = await this.registerLink.isVisible().catch(() => false);
    if (registerVisible) {
      await this.registerLink.click();
      return;
    }

    // Fallback to direct registration URL when the dropdown does not show the link.
    await this.page.goto('index.php?route=account/register');
  }
}
