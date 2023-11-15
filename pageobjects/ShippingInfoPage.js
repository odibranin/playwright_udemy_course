const { page, expect } = require('@playwright/test');

class ShippingInfoPage {
    constructor(page) {
        this.page = page;
        this.creditcardNumberField = page.locator("(//input[@type='text'])[1]");
        this.expiryDateMonthDropdown = page.locator("(//select[@class='input ddl'])[1]");
        this.expiryDateDayDropdown = page.locator("(//select[@class='input ddl'])[2]");
        this.cvvCodeField = page.locator("(//input[@type='text'])[2]");
        this.nameOnCard = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
        this.applyCouponField = page.locator("input[name='coupon']");
        this.applyCouponButton = page.locator("button[type='submit']");
        this.selectCountryField = page.locator("input[placeholder='Select Country']");
        this.emailShippingInfoField = page.locator(".input.txt.text-validated.ng-pristine.ng-valid.ng-touched");
        this.countryDropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".btnn.action__submit.ng-star-inserted");
        this.userLocation = "India";
        this.typedCountry = "ind";
    }

    async fillAndSubmitshippingForm(creditCardNumber, expiryDateMonth, expiryDateDay, cvvCode, nameOnCard, coupon, country) {
        await this.creditcardNumberField.fill(creditCardNumber);
        await this.expiryDateMonthDropdown.selectOption(expiryDateMonth);
        await this.expiryDateDayDropdown.selectOption(expiryDateDay);
        await this.cvvCodeField.fill(cvvCode);
        await this.nameOnCard.fill(nameOnCard);
        await this.applyCouponField.fill(coupon);
        await this.applyCouponButton.click();
        await this.page.waitForTimeout(2000);
        await this.typeIntoField(this.typedCountry, 100)
        await this.countryDropdown.waitFor();

        let optionsCount = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            let text = await this.countryDropdown.locator("button").nth(i).textContent();
            if (text.trim() === this.userLocation) {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }

        await this.placeOrderButton.click();
    }

    async typeIntoField(text, delay) {
        await this.selectCountryField.click(); 
    
        for (const char of text) {
            await this.page.keyboard.press(char, { delay });
        }
    }
}

module.exports = { ShippingInfoPage };
