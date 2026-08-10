import { test } from '../../fixtures/fixtures'
import { expect } from '@playwright/test'
test("@ smoke Testing elements of homePage", async ({ homePage }) => {
    await homePage.navigateToHomePage();
    await expect(homePage.page).toHaveURL("https://naveenautomationlabs.com/opencart/");

})

const products = ["iPhone", "Mac", "Samsung"];
for (const productName of products) {
    test(`@sanity Search ${productName}`, async ({ homePage }) => {
        await homePage.navigateToHomePage();
        await  homePage.searchProduct(productName);
        const results=await homePage.getSearchResults().allTextContents();
        console.log(results)
        expect(results.length).toBeGreaterThan(0);
        
 });
   

}
 


