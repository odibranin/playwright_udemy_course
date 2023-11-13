const{page} = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator("#userEmail");
        this.spasswordField = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async visitLoginPage() {
        await page.goto("https://rahulshettyacademy.com/client");
    }

    async fillAndSubmitLoginForm(email, password) {
        await emailField.fill(email);
        await passwordField.fill(password);
        await loginButton.click();
        await page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};