const { page } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.pageHeaderText = " Thankyou for the order.";
        this.pageHeader = page.locator(".hero-primary");
        this.ordersButton = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
    }

    async validatePageContent() {
        await expect(pageHeader.toHaveText(pageHeaderText));
    }

    async getOrderID() {
        placedOrderIds = await page.$$eval('.em-spacer-1 .ng-star-inserted', labels => {
            return labels.map(label => label.textContent.trim());
        });
    }

    async goToOrders() {
        await placeOrderButton.click();
    }
}
module.exports = { OrderConfirmationPage };