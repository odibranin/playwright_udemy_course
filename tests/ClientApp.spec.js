const { test, expect } = require('@playwright/test');
const { POManager } = require('../utils/POManager');
const { regUserData } = JSON.parse(JSON.stringify(require('../utils/userRegistrationTestData.json')));
const { logUserData } = JSON.parse(JSON.stringify(require('../utils/userLoginTestData.json')));
const { shippingUserData } = JSON.parse(JSON.stringify(require('../utils/shippingInfoTestData.json')));

test('User registers', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager();
    const registrationPage = poManager.getRegistrationPage();
    registrationPage.visitRegistrationPage();
    registrationPage.fillAndSumbitRegistratioForm(
        regUserData.firstname,
        regUserData.lastName,
        regUserData.email,
        regUserData.phoneNumber,
        phoneNumber.password
    );

})

test.only('User dynamically finds the product', async ({ page }) => {
    const poManager = new POManager();
    const loginPage = poManager.getLoginPage();
    loginPage.visitLoginPage();
    loginPage.fillAndSubmitLoginForm(logUserData.email, logUserData.password);

    const productsPage = poManager.getProductsPage();
    productsPage.addProductToCart();
    productsPage.goToCart();

    const cartPage = poManager.getCartPage();
    cartPage.itemInCartValidation();
    cartPage.goToCheckout();

    const shippingInfoPage = poManager.getShippingInfoPage();
    shippingInfoPage.fillAndSubmitshippingForm(
        shippingUserData.creditcardNumber,
        shippingUserData.expiryDateMonth,
        shippingUserData.expiryDateDay,
        shippingUserData.cvvCode,
        shippingUserData.nameOnCard,
        shippingUserData.coupon,
        shippingUserData.country
    );

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    orderConfirmationPage.validatePageContent();
    orderID = orderConfirmationPage.getOrderID();
    orderConfirmationPage.goToOrders();

    const ordersPage = poManager.getOrderPage();
    ordersPage.validateRecentOrderIsPresent(orderID)

    await page.pause();
})


