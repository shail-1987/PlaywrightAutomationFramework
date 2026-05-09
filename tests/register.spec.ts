import {test} from '../fixtures/fixtures';
import { UserBuilder } from '../utils/userBuilder';
import { expect } from '@playwright/test';


test('Register New User', async ({page, registerPage, homePage }) => {
  const user=new UserBuilder().build();
    await page.goto('');
    await homePage.openRegister();
    await registerPage.fillForm(user);
    await registerPage.submitForm();
    await expect(page.locator('h1')).toHaveText('Your Account Has Been Created!');
    
});


