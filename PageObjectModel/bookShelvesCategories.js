const { expect } = require('@playwright/test');

class bookShelvesCategories {
    constructor(page) {
        this.page = page;
        this.popupLocator = page.locator('.popup-text a.close-reveal-modal:has-text(" Close")');
        this.filters = page.locator('li div.gname');
    }

    async closePopupIfVisibleAndCheckTheText(furnitureType) {
        await this.popupLocator.waitFor({ state: 'visible', timeout: 20000 });
        if (await this.popupLocator.isVisible()) {
            await this.popupLocator.click();
        }
        await expect(this.page.locator(`[data-taxon-name='${furnitureType}']`)).toHaveText(` ${furnitureType} `);
    }

    async assignFiltersToTheFurniture() {
        await this.page.waitForTimeout(1000);
    }
}

module.exports = { bookShelvesCategories };
