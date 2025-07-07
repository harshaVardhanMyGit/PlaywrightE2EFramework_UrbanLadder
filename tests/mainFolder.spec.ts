import { test } from '@playwright/test';
import dataset from './utils/furnitureData.json';
import { POManager } from '../PageObjectModel/POManager';

interface FurnitureData {
  furnitureType: string;
  targetPrice: number;
  storageTypeFilter: string;
  mountTypeFilter: string;
  noOfShelves: number;
  recommendedPriceFilter: string;
  productName: string;
  email: string;
  pincode: string;
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const furnitureData: FurnitureData[] = dataset;

for (const datasets of furnitureData) {
  test('Automating Urban Ladder Website', async ({ page }) => {
    
    const pomManager = new POManager(page);
    const bookShelves = await pomManager.getBookShelvesPage();
    const productDetails = await pomManager.getProductDetailsPage();
    const address = await pomManager.getAddressPage();
    const home = await pomManager.getHomePage();

    await home.navigateToHomePage();
    await home.clickOnFurniture(datasets.furnitureType);
    await bookShelves.closePopupIfVisibleAndCheckTheText(datasets.furnitureType);
    await bookShelves.assignFiltersToTheFurniture(
      datasets.targetPrice,
      datasets.storageTypeFilter,
      datasets.mountTypeFilter,
      datasets.noOfShelves,
      datasets.recommendedPriceFilter
    );
    await bookShelves.viewProduct(datasets.productName);
    await productDetails.checkTheProduct(datasets.productName);
    await productDetails.checkOut(datasets.productName);
    await address.fillAddressDetails(
      datasets.email,
      datasets.pincode,
      datasets.address,
      datasets.firstName,
      datasets.lastName,
      datasets.phoneNumber
    );
  });
}