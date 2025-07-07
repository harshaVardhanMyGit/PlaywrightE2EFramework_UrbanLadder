import { bookShelvesCategories } from './bookShelvesCategories';
import { productDetailsPage } from './productDetailsPage';
import { homePage } from './homePage';
import { addressPage } from './addressPage';
import { Page } from '@playwright/test';

export class POManager {
    page: Page;
    bookShelves: bookShelvesCategories;
    productDetails: productDetailsPage;
    address: addressPage;
    home: homePage;

    constructor(page: Page) {
        this.page = page;
        this.bookShelves = new bookShelvesCategories(this.page);
        this.productDetails = new productDetailsPage(this.page);
        this.address = new addressPage(this.page);
        this.home = new homePage(this.page);
    }

    async getHomePage() {
        return this.home;
    }

    async getBookShelvesPage() {
        return this.bookShelves;
    }

    async getProductDetailsPage() {
        return this.productDetails;
    }

    async getAddressPage() {
        return this.address;
    }

}

