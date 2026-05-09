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
    this.registerLink = page.locator('text=Register');
  }

  async navigate(): Promise<void> {
    await this.goto('');
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async openLogin(): Promise<void> {
    await this.accountMenu.click();
    await this.loginLink.click();
  }
  async openRegister(): Promise<void> {
    await this.accountMenu.click();
    await this.registerLink.click();
  }
}
