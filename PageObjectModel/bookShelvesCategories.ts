const { expect } = require('@playwright/test');

class bookShelvesCategories {
    constructor(page) {
        this.page = page;
        this.popupLocator = page.locator('.popup-text a.close-reveal-modal:has-text(" Close")');
        this.filters = page.locator('li div.gname');
        this.priceFilter = page.locator('li div.gname').filter({ hasText: ' Price ' });
        this.upperHandle = page.locator('div.noUi-handle-upper').nth(0);
        this.sliderLocator = page.locator('.connect');
        this.priceRangeText = page.locator('.selrange-filter').textContent();
        this.selectedFilters = page.locator('.list li');
        this.storageTypeFilter = this.filters.filter({ hasText: ' Storage Type ' });
        this.mountTypeFilter = this.filters.filter({ hasText: ' Mount Type ' });
        this.excludeOutOfStock = page.getByLabel('Exclude Out Of Stock');
        this.recommendedPriceFilter = page.locator('.gname span:has-text("Recommended")');
        this.productNames = page.locator('.product-title .name');
        this.productInfo = page.locator('.product-info-block');
        this.minPrice = 585;
        this.maxPrice = 53125;
    }

    async closePopupIfVisibleAndCheckTheText(furnitureType) {
        await this.popupLocator.waitFor({ state: 'visible', timeout: 20000 });
        if (await this.popupLocator.isVisible()) {
            await this.popupLocator.click();
        }
        await expect(this.page.locator(`[data-taxon-name='${furnitureType}']`)).toHaveText(` ${furnitureType} `);
    }

    async assignFiltersToTheFurniture(targetPrice, storageTypeFilterText, mountTypeFilter, noOfShelves, RecommendedP) {
        await this.page.waitForTimeout(1000);
        await this.priceFilter.hover();
        await expect(this.page.locator('.filter-name:has-text("Price")')).toBeVisible();
        await this.dragTheBarCalculation(targetPrice);
        await this.storageTypeFilter.hover();
        await expect(this.page.locator('.filter-name:has-text("Storage Type")')).toBeVisible();
        const labelInStorageType = this.page.locator(`label:has-text("${storageTypeFilterText} ")`).first();
        const labelInStorageTypeText = await labelInStorageType.textContent();
        await labelInStorageType.check();
        expect(await labelInStorageType.isChecked()).toBeTruthy();
        await expect(this.selectedFilters.nth(1)).toHaveText(labelInStorageTypeText);
        console.log('Selected Storage Type:', labelInStorageTypeText);
        await this.mountTypeFilter.hover();
        await expect(this.page.locator('.filter-name:has-text("Mount Type")')).toBeVisible();
        const labelInMountType = this.page.locator(`label:has-text("${mountTypeFilter} ")`);
        const labelInMountTypeText = await labelInMountType.textContent();
        await labelInMountType.check();
        expect(await labelInMountType.isChecked()).toBeTruthy();
        await expect(this.selectedFilters.nth(2)).toHaveText(labelInMountTypeText);
        console.log('Selected Inmount Type:', labelInMountTypeText);
        const noOfShelvesFilter = this.filters.filter({ hasText: ' No of Shelves ' });
        await noOfShelvesFilter.hover();
        await expect(this.page.locator('.filter-name:has-text("No. of Shelves")')).toBeVisible();
        const labelInNoOfShelves = this.page.locator("ul[data-filter-name*='num_shelves'] li label",
            { hasText: `${noOfShelves} ` });
        const labelInNoOfShelvesText = await labelInNoOfShelves.textContent();
        await labelInNoOfShelves.check();
        expect(await labelInNoOfShelves.isChecked()).toBeTruthy();
        await expect(this.selectedFilters.nth(3)).toHaveText(labelInNoOfShelvesText);
        console.log('No of Shelves:', labelInNoOfShelvesText);
        await this.excludeOutOfStock.click();
        expect(await this.excludeOutOfStock.isChecked()).toBeTruthy();
        await this.recommendedPriceFilter.hover();
        const recommendedPriceFilterText = await this.recommendedPriceFilter.textContent();
        await expect(this.page.locator('div ul li.selected')).toHaveText(recommendedPriceFilterText);
        await this.page.locator(`text =Price: ${RecommendedP}`).click();
    }

    async dragTheBarCalculation(targetPriceValue) {
        await this.sliderLocator.waitFor({ state: 'visible' });
        const slider = await this.sliderLocator.boundingBox();
        const proportion = (targetPriceValue - this.minPrice) / (this.maxPrice - this.minPrice);
        const targetX = slider.x + slider.width * proportion;
        await this.upperHandle.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, slider.y + slider.height / 2);
        await this.page.mouse.up();
        console.log('Updated Price Range:', await this.priceRangeText);
    }

    async viewProduct(productName) {
        const listOfProducts = await this.productNames.allTextContents();
        console.log('List of Products:', listOfProducts);
        for (let i = 0; i < await this.productInfo.locator('.name').count(); i++) {
            const productText = await this.productInfo.locator('.name').nth(i).textContent(); // Get the text content of the element
            console.log(`Processing product ${i}:`, productText); // Debugging log
            if (productText.includes(productName)) { // Check if the text contains the desired string
                console.log(`Found matching product at index ${i}:`, productText); // Debugging log
                await this.productInfo.locator('.name').nth(i).hover(); // Hover over the product
                await this.productInfo.locator('a.button:nth-child(2)').nth(i).click(); // Click the button
                break; // Exit the loop after clicking the correct element
            }
        }

    }
}

module.exports = { bookShelvesCategories };
