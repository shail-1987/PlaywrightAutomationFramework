import { BasePage } from './base_page'
import { Page, Locator } from '@playwright/test'

export class AccountPage extends BasePage {
    protected readonly searchBox: Locator;
    constructor(page: Page) {
        super(page)
        this.searchBox = this.page.getByPlaceholder("Search")
    }
    async testSearchFunction(): Promise<void> {
        await this.searchBox.fill("iphone");
    }

}