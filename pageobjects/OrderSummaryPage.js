const { page, expect } = require('@playwright/test');
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')));

class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.orderId = page.locator(".col-text.-main");
        this.pageHeader = page.locator('.email-title');
        this.billingAdressEmail = page.locator("body > app-root:nth-child(1) > app-order-details:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)");
        this.billingAdressCountry = page.locator("body > app-root:nth-child(1) > app-order-details:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)");
        this.deliveryAdressEmail = page.locator("body > app-root:nth-child(1) > app-order-details:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > p:nth-child(2)");
        this.deliveryAdressCountry = page.locator("body > app-root:nth-child(1) > app-order-details:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)");
        this.productTitle = page.locator(".artwork-card .title");
        this.productPrice = page.locator(".artwork-card .price");
        this.viewOrdersButtonText = page.locator(".btn.-teal");
    }

    async validatePageContent(orderId) {
        // Validate Page Header
        const orderSummaryTitle = await this.pageHeader.textContent();
        expect(orderSummaryTitle).toContain('order summary');

        // Validate Product ID
        const actualProductId = await this.orderId.textContent();
        const cleanedOrderId = orderId.replace(/\|/g, '').trim();
        expect(actualProductId).toContain(cleanedOrderId);

        // Validate Billing Email
        const billingAddressEmailText = await this.billingAdressEmail.textContent();
        expect(billingAddressEmailText).toContain(data.orderValidation.email);

        // Validate Billing Country
        const billingAddressCountryText = await this.billingAdressCountry.textContent();
        expect(billingAddressCountryText).toContain(data.orderValidation.country);

        // Validate Delivery Email
        const deliveryAdressEmailText = await this.deliveryAdressEmail.textContent();
        expect(deliveryAdressEmailText).toContain(data.orderValidation.email);

        // Validate Delivery Country
        const deliveryAdressCountryText = await this.deliveryAdressCountry.textContent();
        expect(deliveryAdressCountryText).toContain(data.orderValidation.country);

        // Validate Product Title
        const productTitle = await this.productTitle.textContent();
        expect(productTitle).toContain(data.orderValidation.productTitle);

        // Validate Product Price 
        const productPrice = await this.productPrice.textContent();
        expect(productPrice).toContain(data.orderValidation.productPrice);

        // Validate View Order button text
        const viewOrdersButtonText = await this.viewOrdersButtonText.textContent();
        expect(viewOrdersButtonText).toContain('View Orders');
    }
}
module.exports = { OrderSummaryPage };