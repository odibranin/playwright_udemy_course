const{page} = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async visitLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");
        await this.page.waitForLoadState('load');
    }

    async fillAndSubmitLoginForm(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};