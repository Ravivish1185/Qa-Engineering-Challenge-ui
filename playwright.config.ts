import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();
const date = new Date().toISOString().slice(0, 10);
const outputDir = `./test-results/${date}`;
const ENECO_BASE_URL = process.env.ENECO_BASE_URL;

export default defineConfig({
  timeout: 50 * 2 * 1000,
  expect: { timeout: 10000 },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: false }],
    ['monocart-reporter', {
      name: `Test Report ${date}`,
      outputFile: `${outputDir}/index.html`,
      open: false,
      printSteps: true
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: ENECO_BASE_URL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

  ],
});
