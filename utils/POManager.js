const { RegistrationPage } = require('../pageobjects/RegistrationPage');
const { LoginPage } = require('../pageobjects/LoginPage');
const { ProductsPage } = require('../pageobjects/ProductsPage');
const { CartPage } = require('../pageobjects/CartPage');
const { ShippingInfoPage } = require('../pageobjects/ShippingInfoPage');
const { OrderConfirmationPage } = require('../pageobjects/OrderConfirmationPage');
const { OrdersPage } = require('../pageobjects/OrdersPage');

class POManager {
    constructo(page) {
        this.page = page;
        this.RegistrationPage = new RegistrationPage(this.page);
        this.LoginPage = new LoginPage(this.page);
        this.ProductsPage = new ProductsPage(this.page);
        this.CartPage = new CartPage(page);
        this.ShippingInfoPage = new ShippingInfoPage(page);
        this.OrderConfirmationPage = new OrderConfirmationPage(page);
        this.OrdersPage = new OrdersPage(page);
    }

    getRegistrationPage() {
        return this.RegistrationPage;
    }

    getLoginPage() {
        return this.LoginPage;
    }

    getProductsPage() {
        return this.ProductsPage;
    }

    getCartPage() {
    return this.CartPage;
    }

    getShippingInfoPage() {
        return this.ShippingInfoPage;
    }

    getOrderConfirmationPage() {
        return this.OrderConfirmationPage;
    }

    getOrderPage() {
        return this.OrdersPage;
    }
}
module.exports = { POManager };
