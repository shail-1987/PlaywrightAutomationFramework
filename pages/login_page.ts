import { type Page,Locator } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  readonly emailInput:Locator;
  readonly password:Locator;
  readonly loginBut:Locator;
  

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('#input-email');
    this.password = this.page.locator('#input-password');
    this.loginBut=this.page.locator("[type='submit']")
   
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.password.fill(password);
    await this.loginBut.click();
   
  }

  
}
