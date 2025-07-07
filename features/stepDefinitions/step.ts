import { Given, When, Then, Before, setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { bookShelvesCategories } from '../../PageObjectModel/bookShelvesCategories';
import { productDetailsPage } from '../../PageObjectModel/productDetailsPage';
import { addressPage } from '../../PageObjectModel/addressPage';
import { homePage } from '../../PageObjectModel/homePage';

class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    homePage!: homePage;
    bookShelves!: bookShelvesCategories;
    productDetails!: productDetailsPage;
    address!: addressPage;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.homePage = new homePage(this.page);
    this.bookShelves = new bookShelvesCategories(this.page);
    this.productDetails = new productDetailsPage(this.page);
    this.address = new addressPage(this.page);
});

Given('User opens the website', async function (this: CustomWorld) {
    await this.homePage.navigateToHomePage();
});

When('User clicks on {string} category', async function (this: CustomWorld, category: string) {
    await this.homePage.clickOnFurniture(category);
});

Then('User closes the popup if it is visible and verifies that the text {string}',
    async function (this: CustomWorld, expectedText: string) {
        await this.bookShelves.closePopupIfVisibleAndCheckTheText(expectedText);
    });
