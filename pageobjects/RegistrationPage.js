const { page } = require('@playwright/test');

class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.registerLinkButton = page.locator(".btn1");
        this.firstNameField = page.locator("#firstName");
        this.lastNameField = page.locator("#lastName");
        this.emailField = page.locator("#userEmail");
        this.phoneNumberField = page.locator("#userMobile");
        this.dropdown = page.locator(".custom-select");
        this.maleRadioButton = page.locator("input[value='Male']");
        this.userPasswordField = page.locator("#userPassword");
        this.confirmPasswordField = page.locator("#confirmPassword");
        this.ageCheckbox = page.locator(".col-md-1");
        this.registerButton = page.locator("#login");
    }

    async visitRegistrationPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async fillAndSumbitRegistratioForm(firstName, lastName, email, number, password) {
        await this.registerLinkButton.click();
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.phoneNumberField.fill(number);
        await this.dropdown.selectOption("Engineer");
        await this.maleRadioButton.click();
        await this.userPasswordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.ageCheckbox.click();
        await this.registerButton.click();
    }
}

module.exports = { RegistrationPage };

