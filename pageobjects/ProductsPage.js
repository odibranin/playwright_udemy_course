const { page } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.wantedProduct = "adidas original";
        this.cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
    }
    /*
        async addProductToCart() {
            let numberOfProducts = await this.products.count();
    
            for (let i = 0; i < numberOfProducts; i++) {
                let product = await this.products.nth(i).locator("b").textContent();
                if (product === this.wantedProduct) {
                    await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
                }
            }
        }
    */

    async addProductToCart() {
        try {
            console.log('Waiting for load state');
            await this.page.waitForLoadState('load');

            let numberOfProducts = await this.products.count();
            console.log(`Number of products: ${numberOfProducts}`);

            for (let i = 0; i < numberOfProducts; i++) {
                let product = await this.products.nth(i).locator("b").textContent();
                console.log(`Product ${i + 1}: ${product}`);

                if (product === this.wantedProduct) {
                    console.log('Product found. Clicking "Add To Cart".');
                    await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
                }
            }
        } catch (error) {
            console.error('Error in addProductToCart:', error);
        }
    }

    async goToCart() {
        await this.cartButton.click();
    }
}
module.exports = { ProductsPage };