import {Page, Locator} from '@playwright/test';

export class addressPage {
    page: Page;
    emailInput: Locator;
    pincodeInput: Locator;
    adressInput: Locator;
    nameInput: Locator;
    lastNameInput: Locator;
    phoneInput: Locator;
    continueButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Enter Email');
        this.pincodeInput = page.locator('#order_ship_address_attributes_zipcode');
        this.adressInput = page.locator("textarea[placeholder='Address']").first();
        this.nameInput = page.getByPlaceholder('First Name').first();
        this.lastNameInput = page.getByPlaceholder('Last Name').first();
        this.phoneInput = page.getByPlaceholder('Enter 10 digit mobile number').first();
        this.continueButton = page.getByRole('button', { name: 'Save and Continue' }).first();
    }

    async fillAddressDetails(email: string, pincode: string, address: string, firstName: string, lastName: string, phoneNumber: string) {
        await this.emailInput.fill(email);
        await this.pincodeInput.fill(pincode);
        await this.adressInput.fill(address);
        await this.nameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneInput.fill(phoneNumber);
        await this.continueButton.click();
    }

}

module.exports = { addressPage };