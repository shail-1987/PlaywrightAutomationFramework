import {Page} from "@playwright/test";
import {BasePage} from "./base_page";

export class RegisterPage extends BasePage {
    readonly firstNameInput;
    readonly lastNameInput;
    readonly emailInput;
    readonly telephoneInput;
    readonly passwordInput;
    readonly confirmPasswordInput;
    readonly privacyPolicyCheckbox;
    readonly continueButton;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.confirmPasswordInput = page.locator('#input-confirm');
        this.privacyPolicyCheckbox = page.locator('input[type="checkbox"][name="agree"]');
        this.continueButton = page.locator('input[type="submit"][value="Continue"]');
    }

    async register(user: { firstName: string; lastName: string; email: string; telephone: string; password: string }): Promise<void> {
        // Fill the complete registration form and submit it.
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.telephoneInput.fill(user.telephone);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }

    async fillForm(user:any): Promise<void> {
        // Fill only the form fields, leaving submission separate.
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.telephoneInput.fill(user.telephone);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
    }

    async submitForm(): Promise<void> {
        // Check the privacy policy and submit the form.
        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }
}