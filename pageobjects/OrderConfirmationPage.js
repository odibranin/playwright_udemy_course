const { page, expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.pageHeaderText = " Thankyou for the order.";
        this.pageHeader = page.locator(".hero-primary");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async validatePageContent() {
        await expect(this.pageHeader).toContainText(this.pageHeaderText);
    }

    async getOrderID() {
        let orderID = await this.orderId.textContent();
        return orderID;
    }

    async goToOrders() {
        await this.ordersButton.click();
    }
}
module.exports = { OrderConfirmationPage };