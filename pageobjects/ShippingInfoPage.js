const { page } = require('@playwright/test');

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
        this.emailShippingInfoField = page.locator(".input.txt.text-validated.ng-pristine.ng-valid.ng-touched")
        this.userEmail = "johndough@gmail.com";
        this.countryDropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".btnn.action__submit.ng-star-inserted");
        this.userLocation = "India";
    }

    async fillAndSubmitshippingForm(creditCardNumber, expiryDateMonth, expiryDateDay, cvvCode, coupon, country) {
        await creditcardNumberField.fill(creditCardNumber);
        await expiryDateMonthDropdown.selectOption(expiryDateMonth);
        await expiryDateDayDropdown.selectOption(expiryDateDay);
        await cvvCodeField.fill(cvvCode);
        await nameOnCard.fill(nameOnCard);
        await applyCouponField.fill(coupon);
        await applyCouponButton.click();
        await page.waitForTimeout(5000);
        await expect(emailShippingInfoField).toHaveText(userEmail)
        await selectCountryField.pressSequentially(country, { delay: 100 });
        await countryDropdown.waitFor();

        let optionsCount = await countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            let text = await countryDropdown.locator("button").nth(i).textContent();
            if (text.trim() === this.userLocation) {
                await countryDropdown.locator("button").nth(i).click();
                break;
            }
        }

        await placeOrderButton.click();
    }
}
module.exports = {ShippingInfoPage};