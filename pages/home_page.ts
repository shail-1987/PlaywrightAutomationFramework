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
    // Navigate directly to the register page for reliability in CI.
    const baseURL = process.env.URL || '';
    await this.page.goto(new URL('index.php?route=account/register', baseURL).toString(), { waitUntil: 'load' });
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('#input-firstname').waitFor({ state: 'attached', timeout: 30000 });
  }

  async logout(): Promise<void> {
    // Navigate to the logout page to ensure the user is logged out.
    const baseURL = process.env.URL || '';
    await this.page.goto(new URL('index.php?route=account/logout', baseURL).toString());
  }
}
