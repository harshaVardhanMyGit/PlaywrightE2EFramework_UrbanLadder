const { test, expect } = require('@playwright/test');


test('Automating Urban Ladder Website', async ({ page }) => {
  await page.goto('https://www.urbanladder.com/', { waitUntil: "domcontentloaded" });
  // Navigates to the Urban Ladder website and waits until there are no active network requests
  // No network requests means the page is fully loaded and no other requests are pending
  const bookshelvesLocator = page.locator('a h4:has-text("Bookshelves")');
  await bookshelvesLocator.scrollIntoViewIfNeeded();
  expect(await bookshelvesLocator.isVisible()).toBeTruthy();
  await bookshelvesLocator.click();
  const popupLocator = page.locator('.popup-text a.close-reveal-modal:has-text(" Close")');
  await popupLocator.waitFor({ state: 'visible', timeout: 20000 });
  if (await popupLocator.isVisible()) {
    await popupLocator.click();
  }
  await expect(page.locator("[data-taxon-name='Bookshelves']")).toHaveText(' Bookshelves ');
  await page.waitForTimeout(1000); // Wait for the hover effect to take place
  const filters = page.locator('li div.gname');
  const priceFilter = filters.filter({ hasText: ' Price ' });
  await priceFilter.hover();
  await expect(page.locator('.filter-name:has-text("Price")')).toBeVisible();
  const upperHandle = page.locator('div.noUi-handle-upper').nth(0); // Lower handle
  const sliderLocator = page.locator('.connect');
  await sliderLocator.waitFor({ state: 'visible' }); // Wait for the slider to be visible
  const slider = await sliderLocator.boundingBox();
  const minPrice = 585;
  const maxPrice = 53125;
  const targetPrice = 15000;
  const proportion = (targetPrice - minPrice) / (maxPrice - minPrice);  //0.27 value
  //15000 is 27 percentage along the slider track
  const targetX = slider.x + slider.width * proportion;
  await upperHandle.hover();
  await page.mouse.down();
  await page.mouse.move(targetX, slider.y + slider.height / 2);
  await page.mouse.up();
  const priceRangeText = await page.locator('.selrange-filter').textContent();
  console.log('Updated Price Range:', priceRangeText);
  const selectedFilters = page.locator('.list li');
  const storageTypeFilter = filters.filter({ hasText: ' Storage Type ' });
  await storageTypeFilter.hover();
  await expect(page.locator('.filter-name:has-text("Storage Type")')).toBeVisible();
  const labelInStorageType = page.locator('label:has-text("Open ")').first();
  const labelInStorageTypeText = await labelInStorageType.textContent();
  await labelInStorageType.check();
  expect(await labelInStorageType.isChecked()).toBeTruthy();
  await expect(selectedFilters.nth(1)).toHaveText(labelInStorageTypeText);
  console.log('Selected Storage Type:', labelInStorageTypeText);
  const mountTypeFilter = filters.filter({ hasText: ' Mount Type ' });
  await mountTypeFilter.hover();
  await expect(page.locator('.filter-name:has-text("Mount Type")')).toBeVisible();
  const labelInMountType = page.locator('label:has-text("Free Standing ")');
  const labelInMountTypeText = await labelInMountType.textContent();
  await labelInMountType.check();
  expect(await labelInMountType.isChecked()).toBeTruthy();
  await expect(selectedFilters.nth(2)).toHaveText(labelInMountTypeText);
  console.log('Selected Inmount Type:', labelInMountTypeText);
  const noOfShelvesFilter = filters.filter({ hasText: ' No of Shelves ' });
  await noOfShelvesFilter.hover();
  await expect(page.locator('.filter-name:has-text("No. of Shelves")')).toBeVisible();
  const labelInNoOfShelves = page.locator("ul[data-filter-name*='num_shelves'] li label",
    { hasText: '6 ' });
  const labelInNoOfShelvesText = await labelInNoOfShelves.textContent();
  await labelInNoOfShelves.check();
  expect(await labelInNoOfShelves.isChecked()).toBeTruthy();
  await expect(selectedFilters.nth(3)).toHaveText(labelInNoOfShelvesText);
  console.log('No of Shelves:', labelInNoOfShelvesText);
  const excludeOutOfStock = page.getByLabel('Exclude Out Of Stock');
  await excludeOutOfStock.click();
  expect(await excludeOutOfStock.isChecked()).toBeTruthy();
  const recommendedPriceFilter = page.locator('.gname span:has-text("Recommended")');
  await recommendedPriceFilter.hover();
  const recommendedPriceFilterText = await recommendedPriceFilter.textContent();
  await expect(page.locator('div ul li.selected')).toHaveText(recommendedPriceFilterText);
  await page.locator('text =Price: Low to High').click();
  const productNames = page.locator('.product-title .name');
  const listOfProducts = await productNames.allTextContents();
  console.log('List of Products:', listOfProducts);
  const productInfo = page.locator('.product-info-block');
  const productName = 'Hayden Engineered Wood Bookshelf in Classic Walnut Finish'
  for (let i = 0; i < await productInfo.locator('.name').count(); i++) {
    const productText = await productInfo.locator('.name').nth(i).textContent(); // Get the text content of the element
    if (productText.includes(productName)) { // Check if the text contains the desired string
      await productInfo.locator('.name').nth(i).hover(); // Hover over the product
      await productInfo.locator('a.button:nth-child(2)').nth(i).click(); // Click the button
    }
  }
  await expect(page.getByText(productName).first()).toHaveText(productName);
  await page.getByRole('button', { name: 'Add to Cart ' }).first().click();
  const cartDetails = page.locator('.cart-line-item');
  await expect(cartDetails.locator('.product-title')).toHaveText(productName);
  const checkOutButton = page.getByRole('button', { name: 'Checkout' }).first();
  await checkOutButton.click();
  const emailInput = page.getByPlaceholder('Enter Email');
  await emailInput.fill('myProject@gmail.com');
  const pincodeInput = page.getByPlaceholder('PIN Code');
  await pincodeInput.fill('560057');
  const adressInput = page.getByPlaceholder('Address');
  await adressInput.fill('Thoraipakkam, Tamil Nadu, India');
  const nameInput = page.getByPlaceholder('First Name');
  await nameInput.fill('Bhai');
  const lastNameInput = page.getByPlaceholder('Last Name');
  await lastNameInput.fill('Rocky');
  const phoneInput = page.getByPlaceholder('Enter 10 digit mobile number');
  await phoneInput.fill('9876543210');
  const continueButton = page.getByRole('button', { name: 'Save and Continue' });
  await continueButton.click();


});

