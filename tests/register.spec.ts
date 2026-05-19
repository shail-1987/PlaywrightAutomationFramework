import { test } from '../fixtures/fixtures';
import { UserBuilder } from '../utils/userBuilder';
import { expect } from '@playwright/test';
import registerData from '../test_data/register_data.json';

const { invalidEmail, invalidTelephone, shortPassword, sampleUser } = registerData;

test.describe('@smoke Registration UI tests', () => {
  test.beforeEach(async ({ homePage, registerPage }) => {
    await homePage.navigate();
    await homePage.logout();
    await homePage.openRegister();
    await expect(registerPage.firstNameInput).toBeVisible();
  });

  test('should display the registration page heading', async ({ registerPage }) => {
    await expect(registerPage.page.locator('h1')).toHaveText('Register Account');
  });

  test('should display first name field', async ({ registerPage }) => {
    await expect(registerPage.firstNameInput).toBeVisible();
  });

  test('should display last name field', async ({ registerPage }) => {
    await expect(registerPage.lastNameInput).toBeVisible();
  });

  test('should display email field', async ({ registerPage }) => {
    await expect(registerPage.emailInput).toBeVisible();
  });

  test('should display telephone field', async ({ registerPage }) => {
    await expect(registerPage.telephoneInput).toBeVisible();
  });

  test('should display password field', async ({ registerPage }) => {
    await expect(registerPage.passwordInput).toBeVisible();
  });

  test('should display confirm password field', async ({ registerPage }) => {
    await expect(registerPage.confirmPasswordInput).toBeVisible();
  });

  test('should display privacy policy checkbox', async ({ registerPage }) => {
    await expect(registerPage.privacyPolicyCheckbox).toBeVisible();
    await expect(registerPage.privacyPolicyCheckbox).not.toBeChecked();
  });

  test('should display continue button', async ({ registerPage }) => {
    await expect(registerPage.continueButton).toBeVisible();
    await expect(registerPage.continueButton).toHaveAttribute('value', 'Continue');
  });

  test('should verify register page route', async ({ registerPage }) => {
    await expect(registerPage.page).toHaveURL(/route=account\/register/);
  });

  test('should navigate to login from the register page', async ({ registerPage }) => {
    await expect(registerPage.page.getByRole('link', { name: 'Login', exact: true }).first()).toBeVisible();
  });

  test('should allow telephone field to accept numeric input', async ({ registerPage }) => {
    await registerPage.telephoneInput.fill('1234567890');
    await expect(registerPage.telephoneInput).toHaveValue('1234567890');
  });
});

test.describe('@sanity Registration functional tests', () => {
  test.beforeEach(async ({ homePage, registerPage }) => {
    await homePage.navigate();
    await homePage.logout();
    await homePage.openRegister();
    await expect(registerPage.firstNameInput).toBeVisible();
  });

  test('should register a new user successfully', async ({ page, registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.register(user);
    await expect(page.locator('h1')).toHaveText('Your Account Has Been Created!');
  });

  test('should show error for invalid email format', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(invalidEmail);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error for missing first name', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error for missing last name', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error for missing email address', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error for missing telephone number', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error for missing password', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error for password mismatch', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password + 'Mismatch');
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show error when privacy policy is not accepted', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should keep form field values after failed submission', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(invalidEmail);
    await registerPage.telephoneInput.fill(user.telephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.firstNameInput).toHaveValue(user.firstName);
    await expect(registerPage.lastNameInput).toHaveValue(user.lastName);
    await expect(registerPage.emailInput).toHaveValue(invalidEmail);
  });

  test('should show error for invalid telephone format', async ({ registerPage }) => {
    const user = new UserBuilder().build();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.telephoneInput.fill(invalidTelephone);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.confirmPasswordInput.fill(user.password);
    await registerPage.privacyPolicyCheckbox.check();
    await registerPage.continueButton.click();

    await expect(registerPage.page.locator('.alert-danger')).toBeVisible();
  });
});


//shail