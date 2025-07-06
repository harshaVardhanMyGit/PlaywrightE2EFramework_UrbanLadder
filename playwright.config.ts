// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  // retries: 1,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  }, //for all expect statements
  reporter: [
    ['html', { open: 'always' }], // HTML report
    ['list'], // Console list report
    ['json', { outputFile: 'test-results.json' }], // JSON report
    ['allure-playwright'], // Allure report
  ],
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true, // Ignore SSL certificate errors
    permissions: ['geolocation'], // Allow geolocation
  },
});

export default config;

