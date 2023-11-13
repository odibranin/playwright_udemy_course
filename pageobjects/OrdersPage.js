const { page } = require('@playwright/test');

class OrdersPage {
    constructor(page) {
        this.page = page;

    }

    async validateRecentOrderIsPresent(orderID) {
        const allOrderIds = await page.$$eval('.table tbody tr', rows => {
            return rows.map(row => {
                const orderIdElement = row.querySelector('th[scope="row"]');
                return orderIdElement ? orderIdElement.textContent.trim() : null;
            });
        });

        placedOrderIds.forEach(placedOrderId => {
            expect(allOrderIds).toContain(orderID);
        });
    }
}
module.exports = { OrdersPage };