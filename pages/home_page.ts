import { BasePage } from './base_page';
import type { Page,Locator } from '@playwright/test';

export class HomePage extends BasePage {
 // used protected so that it can be used only inside page object classes to maintain encapsulation.. pom ka main goal hota hai test classes directly
 //page clasees use na kare 
  protected readonly searchInput:Locator;
  protected readonly searchButton:Locator;
  protected readonly accountMenu:Locator;
  protected readonly loginLink:Locator;
  protected readonly registerLink:Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.locator('input[name="search"]');
    this.searchButton = this.page.locator('button[type="button"][class*=\"btn-default\"]');
    this.accountMenu = this.page.locator('a[title="My Account"]');
    this.loginLink = this.page.locator('text=Login');
    this.registerLink = this.page.locator('a[href*="route=account/register"]');
   // this.iphoneLink=this.page.getByRole('link',{name:'iPhone'});
   // this.iPhoneImage=this.page.getByRole('img',{name:'iPhone'});
  }

  async navigateToHomePage(): Promise<void> {
    await this.goto('');//BasePage wali goto() method ko call karo
  }

  async searchProduct(item: string): Promise<void> {
    await this.searchInput.fill(item);
    await this.searchButton.click();
  }
  
  
  getSearchResults():Locator{
    return this.page.locator('.product-thumb h4 a')
  }

  async openLogin(): Promise<void> {
    // Open the My Account dropdown and click on Login.
    await this.accountMenu.click();
    await this.loginLink.click();
  }

  async openRegister(): Promise<void> {
    await this.goto('/index.php?route=account/register');
  }

  async logout(): Promise<void> {
    await this.goto('/index.php?route=account/logout');
  }
}
