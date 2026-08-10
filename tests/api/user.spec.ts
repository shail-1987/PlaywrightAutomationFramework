import { test, expect } from "@playwright/test";
import { UserService } from "../../api/services/UserService";

test.describe("User API Test Suite", () => {

    let userService: UserService;

    test.beforeEach(async ({ request }) => {
        userService = new UserService(request);
    });

    test("Get Users API", async () => {

        const response = await userService.getUsers();

        expect(response.status()).toBe(200);

        const responseData = await response.json();

        expect(Array.isArray(responseData)).toBeTruthy();

        expect(responseData.length).toBeGreaterThan(0);

        console.log(responseData);
    });

});