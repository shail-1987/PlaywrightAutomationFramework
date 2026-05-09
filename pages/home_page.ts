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
    // Attempt the UI flow first, but fall back to direct navigation if the dropdown fails.
    await this.goto('');

    try {
      await this.accountMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.accountMenu.click();
      await this.registerLink.waitFor({ state: 'visible', timeout: 3000 });
      await this.registerLink.click();
      await this.page.waitForSelector('#input-firstname', { state: 'visible', timeout: 10000 });
      return;
    } catch {
      const baseURL = process.env.URL || '';
      await this.page.goto(new URL('index.php?route=account/register', baseURL).toString(), { waitUntil: 'domcontentloaded' });
      await this.page.waitForSelector('#input-firstname', { state: 'visible', timeout: 10000 });
    }
  }
}
