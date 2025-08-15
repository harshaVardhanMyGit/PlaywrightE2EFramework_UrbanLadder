import {Page, expect, Locator} from '@playwright/test';

export class productDetailsPage {
    page: Page;
    cartDetails : Locator;
    checkOutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.cartDetails = page.locator('.cart-line-item');
        this.checkOutButton = page.getByRole('button', { name: 'Checkout' }).first();
    }

    async checkTheProduct(productName: string) {
        await this.page.getByText(productName).first().waitFor({
            state: 'visible',
            timeout: 10000});
        await expect(this.page.getByText(productName).first()).toHaveText(productName);
        await this.page.getByRole('button', { name: 'Add to Cart ' }).first().waitFor({
            state: 'visible',
            timeout: 10000
        })
        await this.page.getByRole('button', { name: 'Add to Cart ' }).first().click();
    }

    async checkOut(productName: string) {
        await expect(this.cartDetails.locator('.product-title')).toHaveText(productName);
        await this.checkOutButton.click();
    }

}
