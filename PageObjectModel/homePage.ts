import { Page, expect, Locator } from '@playwright/test';

export class homePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto('https://www.urbanladder.com/', { waitUntil: "domcontentloaded" });
    }

    async clickOnFurniture(typeOfFurniture: string) {
        const bookshelvesLocator: Locator = this.page.locator(`a h4:has-text("${typeOfFurniture}")`);
        await bookshelvesLocator.scrollIntoViewIfNeeded();
        expect(await bookshelvesLocator.isVisible()).toBeTruthy();
        await bookshelvesLocator.click();
    }

}


