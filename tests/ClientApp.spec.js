const { test } = require('@playwright/test');
const { POManager } = require('../utils/POManager');
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')));

test('User registers', async ({ page }) => {
    const poManager = new POManager(page);
    const registrationPage = poManager.getRegistrationPage();

    // Perform user registration
    await registrationPage.visitRegistrationPage();
    await registrationPage.fillAndSumbitRegistratioForm(
        data.userRegistration.firstName,
        data.userRegistration.lastName,
        data.userRegistration.email,
        data.userRegistration.phoneNumber,
        data.userRegistration.password
    );
});

test.only('User adds product to cart and completes checkout', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Log in
    await loginPage.visitLoginPage();
    await loginPage.fillAndSubmitLoginForm(
        data.userLogin.email,
        data.userLogin.password
    );

    // Add product to cart
    const productsPage = poManager.getProductsPage();
    await productsPage.addProductToCart();
    await productsPage.goToCart();

    // Validate item presence in cart
    const cartPage = poManager.getCartPage();
    await cartPage.itemInCartValidation();
    await cartPage.goToCheckout();

    // Fill shipping information
    const shippingInfoPage = poManager.getShippingInfoPage();
    await shippingInfoPage.fillAndSubmitshippingForm(
        data.shippingInfo.creditcardNumber,
        data.shippingInfo.expiryDateMonth,
        data.shippingInfo.expiryDateDay,
        data.shippingInfo.cvvCode,
        data.shippingInfo.nameOnCard,
        data.shippingInfo.coupon,
        data.shippingInfo.country
    );

    // Validate order confirmation
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.validatePageContent();
    let orderID = await orderConfirmationPage.getOrderID(); 
    await orderConfirmationPage.goToOrders();

    // Validate order presence in orders
    const ordersPage = poManager.getOrderPage();
    await ordersPage.searchOrderAndSelect(orderID);

    // Validate order info in order summary page
    const orderSummaryPage = poManager.getOrderSummaryPage();
    orderSummaryPage.validatePageContent(orderID);

    // Optional pause for debugging
    await page.pause();
});

