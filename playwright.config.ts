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
  reporter: [['html', { open: 'always' }], ['list'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,  //your connection is private type errors - playwright ignore i guess
    //without blocked by ssl warnings
    permissions: ['geolocation'], //to allow location
    //viewport: { width: 720, height: 720 }
  },

});

module.exports = config

