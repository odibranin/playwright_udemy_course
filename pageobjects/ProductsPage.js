const { page } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.wantedProduct = "adidas original";
        this.cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
    }

    async addProductToCart() {
        let numberOfProducts = await products.count();

        for (let i = 0; i < numberOfProducts; i++) {
            let product = await products.nth(i).locator("b").textContent();
            if (product === wantedProduct) {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async goToCart() {
        await cartButton.click();
    }
}
module.exports = { ProductsPage };