const { page, expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");
    }

    async itemInCartValidation() {
        await this.page.locator("div li").first().waitFor();
        const isItemPresentInCart = await this.page.locator("h3:has-text('adidas original')").isVisible();
        expect(isItemPresentInCart).toBeTruthy();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
module.exports = {CartPage};