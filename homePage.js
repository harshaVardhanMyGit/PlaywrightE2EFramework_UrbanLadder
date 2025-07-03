const { expect } = require('@playwright/test');

class homePage {
    constructor(page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto('https://www.urbanladder.com/', { waitUntil: "domcontentloaded" });
    }

    async clickOnFurniture(typeOfFurniture) {
        this.bookshelvesLocator = this.page.locator(`a h4:has-text("${typeOfFurniture}")`);
        await this.bookshelvesLocator.scrollIntoViewIfNeeded();
        expect(await this.bookshelvesLocator.isVisible()).toBeTruthy();
        await this.bookshelvesLocator.click();
    }  

}

module.exports = { homePage };