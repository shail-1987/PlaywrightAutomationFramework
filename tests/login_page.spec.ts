import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import loginData from '../test_data/login_data.json';

const validEmail = process.env.EMAIL ?? loginData.validEmail;
const validPassword = process.env.PASSWORD ?? loginData.validPassword;
const { invalidEmail, invalidPassword, testEmail, testPassword } = loginData;

const forgottenPasswordLink = 'a[href*="route=account/forgotten"][role="link"]';

test.describe('@smoke Login UI tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('index.php?route=account/login');
    await loginPage.expectLoginPage();
  });

  test('should open the login page from the home page', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.openLogin();

    await expect(homePage.page).toHaveURL(/route=account\/login/);
    await expect(homePage.page.locator('h2', { hasText: 'Returning Customer' })).toBeVisible();
  });

  test('should display the Returning Customer heading', async ({ loginPage }) => {
    await expect(loginPage.returningCustomerHeading).toBeVisible();
  });

  test('should display the email input field', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('should display the password input field', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('should display the login button', async ({ loginPage }) => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('should allow typing into the email field', async ({ loginPage }) => {
    await loginPage.emailInput.fill(testEmail);
    await expect(loginPage.emailInput).toHaveValue(testEmail);
  });

  test('should allow typing into the password field', async ({ loginPage }) => {
    await loginPage.passwordInput.fill(testPassword);
    await expect(loginPage.passwordInput).toHaveValue(testPassword);
  });

  test('should show forgotten password link on login page', async ({ loginPage }) => {
    await expect(loginPage.page.locator('#content').getByRole('link', { name: 'Forgotten Password', exact: true })).toBeVisible();
  });

  test('should verify login page URL contains the login route', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveURL(/route=account\/login/);
  });

  test('should display a login button with the correct label', async ({ loginPage }) => {
    await expect(loginPage.loginButton).toHaveText(/Login/i);
  });

  test('should show My Account menu on login page', async ({ loginPage }) => {
    await expect(loginPage.page.locator('a[title="My Account"]')).toBeVisible();
  });

  test('should navigate to the register page from login page', async ({ loginPage }) => {
    await loginPage.page.locator('text=Continue').click().catch(() => {});
    await expect(loginPage.page).not.toHaveURL(/route=account\/login/);
  });
});

test.describe('@sanity Login functional tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('index.php?route=account/login');
    await loginPage.expectLoginPage();
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(validEmail, validPassword);
    await expect(page).toHaveURL(/route=account\/account/);
    await expect(page.locator('h2', { hasText: 'My Account' })).toBeVisible();
  });

  test('should show warning for invalid email', async ({ loginPage }) => {
    await loginPage.login(invalidEmail, validPassword);
    await expect(loginPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show warning for invalid password', async ({ loginPage }) => {
    await loginPage.login(validEmail, invalidPassword);
    await expect(loginPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show warning when email is empty', async ({ loginPage }) => {
    await loginPage.login('', validPassword);
    await expect(loginPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should show warning when password is empty', async ({ loginPage }) => {
    await loginPage.login(validEmail, '');
    await expect(loginPage.page.locator('.alert-danger')).toBeVisible();
  });

  test('should allow submitting the form with Enter key', async ({ loginPage, page }) => {
    await loginPage.emailInput.fill(validEmail);
    await loginPage.passwordInput.fill(validPassword);
    await loginPage.passwordInput.press('Enter');

    await expect(page).toHaveURL(/route=account\/account/);
  });

  test('should keep form values after failed login attempt', async ({ loginPage }) => {
    await loginPage.emailInput.fill(invalidEmail);
    await loginPage.passwordInput.fill(invalidPassword);
    await loginPage.loginButton.click();

    await expect(loginPage.page.locator('.alert-danger')).toBeVisible();
    await expect(loginPage.emailInput).toHaveValue(invalidEmail);
    await expect(loginPage.passwordInput).toHaveValue(invalidPassword);
  });

  test('should allow switching to login page again after navigation away', async ({ loginPage, homePage }) => {
    await homePage.navigate();
    await homePage.openLogin();
    await expect(loginPage.returningCustomerHeading).toBeVisible();
  });

  test('should log in with lower-case email even if typed in mixed case', async ({ loginPage, page }) => {
    const mixedCaseEmail = validEmail.toUpperCase();
    await loginPage.login(mixedCaseEmail, validPassword);
    await expect(page).toHaveURL(/route=account\/account/);
  });
});
