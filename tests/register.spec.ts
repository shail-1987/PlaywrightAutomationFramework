import { test } from '../fixtures/fixtures';
import { UserBuilder } from '../utils/userBuilder';
import { expect } from '@playwright/test';


test('Register New User', async ({ page, registerPage, homePage }) => {
  const user = new UserBuilder().build();

  // Start from the application home page.
  await homePage.navigate();

  // Ensure the user is logged out before registering.
  await homePage.logout();

  // Open the registration page.
  await homePage.openRegister();

  // Fill and submit the registration form.
  await registerPage.fillForm(user);
  await registerPage.submitForm();

  // Verify successful account creation.
  await expect(page.locator('h1')).toHaveText('Your Account Has Been Created!');
});


