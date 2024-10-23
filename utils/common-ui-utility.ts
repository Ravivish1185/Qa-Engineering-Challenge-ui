import { expect,type Locator, type Page } from '@playwright/test';
import { logger } from './reporter-utility';


export class CommonMethod {
    constructor(public page: Page,
        ) {
        }

/**
 * Asserts that the text content of the specified element matches the expected value.
 * @param {Locator} assertLocator - The locator for the element whose text content will be asserted.
 * @param {string} expectedValue - The expected text content of the element.
 * @returns {Promise<void>} - A promise that resolves when the assertion is complete.
 */
async assertMessage(
    assertLocator: Locator, 
    expectedValue:string
    ):Promise<void>{
    await this.page.waitForLoadState("load");
    const value = await assertLocator.innerText();
    try{
        expect(value.trim()).toBe(expectedValue);
        logger.info(`Assertion Passed`);
    }catch(error) {
        logger.error(`Assertion failed: Expected "${expectedValue}", Found "${value}"`);
        throw error;
    }
}

}