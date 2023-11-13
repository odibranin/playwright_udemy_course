const { page } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");
    }

    async itemInCartValidation() {
        await page.locator("div li").first().waitFor();
        const isItemPresentInCart = await page.locator("h3:has-text('adidas original')").isVisible();
        expect(isItemPresentInCart).toBeTruthy();
    }

    async goToCheckout() {
        await checkoutButton.click();
    }
}
module.exports = {CartPage};