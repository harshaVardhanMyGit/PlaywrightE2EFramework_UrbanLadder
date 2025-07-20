import { test, request, expect } from '@playwright/test';
import uiData from './utils/UITestData.json';
import apiData from './utils/APITestData.json';
import { POManager } from '../PageObjectModel/POManager';

interface FurnitureUIData {
    furnitureType: string;
    targetPrice: number;
    storageTypeFilter: string;
    lowestPrice: number; 
    mountTypeFilter: string;
    noOfShelves: number;
    recommendedPriceFilter: string;
    availabilityFilter: string;
    productName: string;
    email: string;
    pincode: string;
    address: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface APIData{
    expectedStrings: any;
}

const furnitureData: FurnitureUIData= uiData[0];
const expectedStrings = apiData[0].expectedStrings;

test('Apply the filters and verify the same in the body', async ({ page }) => {

    const pomManager = new POManager(page);
    const bookShelves = await pomManager.getBookShelvesPage();
    const productDetails = await pomManager.getProductDetailsPage();
    const address = await pomManager.getAddressPage();
    const home = await pomManager.getHomePage();

    await home.navigateToHomePage();
    await home.clickOnFurniture(furnitureData.furnitureType);
    await bookShelves.closePopupIfVisibleAndCheckTheText(furnitureData.furnitureType);
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://www.urbanladder.com/bookshelf', {
        params: {
            src: 'explore_categories',
            'filters[price][min]': furnitureData.lowestPrice,
            'filters[price][max]': furnitureData.targetPrice,
            'filters[storage_type][]': furnitureData.storageTypeFilter,
            'filters[mount_type][]': furnitureData.mountTypeFilter,
            'filters[num_shelves][]': furnitureData.noOfShelves,
            'filters[availability][]': furnitureData.availabilityFilter,
            'sort': 'price_asc'

        },
        headers: {
            'user-Agent': 'Playwright-Test-Agent',
            'accept': 'text/html'
        }

    });
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    for (const expected of expectedStrings) {
        expect(JSON.stringify(body)).toContain(expected.toString());
    }

});