import { test } from "@playwright/test";
import { CalculateMonthlyAmount, FillCalculateMonthlyAmountFormParams } from "../../pages/calculate-monthly-amount.page";
import { CommonMethod } from "../../utils/common-ui-utility";
import enecoTestData from "../../test-data/calculate-monthly-amount/calculate-monthly-test-data.json"
import { logger } from "../../utils/reporter-utility";


let calculateMonthlyAmount: CalculateMonthlyAmount;
let commonObject: CommonMethod
test.describe("As a user, I should be able to Calculate the Monthly Amount for Stroom & gas, Alleen gas and Alleen stroom", async () => {
  
  // Navigates to the root URL ("/") and initializes necessary page objects 
  test.beforeEach(async ({page}) => {
    calculateMonthlyAmount = new CalculateMonthlyAmount(page);
    commonObject = new CommonMethod(page);
    await page.goto('/');
    await calculateMonthlyAmount.btn_accpetnce.click();
  });

  test('As a user, I should be able to fill the energy calculated amount form for Alleen stroom', async () => {
    try {
        // Navigating to the entered area location
        await calculateMonthlyAmount.selectAreaForCalculateMonthlyAmount(
            enecoTestData.AlleenStroom.enecoPostalCode,
            enecoTestData.AlleenStroom.enecoHouseNo,
            enecoTestData.AlleenStroom.enecofullAddressMessage
        );

        // Assertion on select energy type of page header text
        await commonObject.assertMessage(calculateMonthlyAmount.txt_calculatorPageHeader, enecoTestData.AlleenStroom.enecoCaluatorHeaderText);
        
        // Prepare parameters for filling the form
        const formParams: FillCalculateMonthlyAmountFormParams = {
            energyType: "Alleen stroom",
            energyConsumption: "Nee, help mij inschatten",
            consumptionUnit:"4000",
            householdSize: "of meer",
            houseType: "Tussenwoning",
            homeBuild: "Na 2000",
            moving: "Nee, ik ga niet verhuizen",
            workLive: "Ja",
            phoneNumber: enecoTestData.AlleenStroom.enecoPhonenumber,
            emailAddress: enecoTestData.AlleenStroom.enecoEmailAddress,
            bankDetails: enecoTestData.AlleenStroom.enecoBankDetails,
            smartMeter: "Nee, ik heb geen slimme meter",
            solarPanels: "Ja, ik wek zelf stroom op",
            powerGrid: enecoTestData.AlleenStroom.enecoPowerGrid,
        };

        // Calculating the monthly amount energy
        await calculateMonthlyAmount.fillCalculateMonthlyAmountForm(formParams);
        
        // Assert the success message
        await commonObject.assertMessage(calculateMonthlyAmount.txt_successMessage, enecoTestData.AlleenStroom.enecoSuccessMessage);
        logger.info("Test Case Passed");
    } catch (error) {
        logger.error("Test Case Failed", error);
        throw error;
    }
});


test('As a user, I should be able to fill the energy calculated amount form for Stroom & gas', async () => {
    try{
        // Navigating to the entered area location
        await calculateMonthlyAmount.selectAreaForCalculateMonthlyAmount(
            enecoTestData.StroomGas.enecoPostalCode,
            enecoTestData.StroomGas.enecoHouseNo,
            enecoTestData.StroomGas.enecofullAddressMessage
        );

        // Assertion on select energy type of page header text
        await commonObject.assertMessage(calculateMonthlyAmount.txt_calculatorPageHeader, enecoTestData.StroomGas.enecoCaluatorHeaderText);
        
        // Prepare parameters for filling the form
        const formParams: FillCalculateMonthlyAmountFormParams = {
            energyType: "Stroom & gas",
            energyConsumption: "Nee, help mij inschatten",
            consumptionUnit:"4000",
            householdSize: "of meer",
            houseType: "Tussenwoning",
            homeBuild: "Na 2000",
            moving: "Nee, ik ga niet verhuizen",
            workLive: "Ja",
            phoneNumber: enecoTestData.StroomGas.enecoPhonenumber,
            emailAddress: enecoTestData.StroomGas.enecoEmailAddress,
            bankDetails: enecoTestData.StroomGas.enecoBankDetails,
            smartMeter: "Nee, ik heb geen slimme meter",
            solarPanels: "Ja, ik wek zelf stroom op",
            powerGrid: enecoTestData.StroomGas.enecoPowerGrid,
        };

        // Calculating the monthly amount energy
        await calculateMonthlyAmount.fillCalculateMonthlyAmountForm(formParams);
        
        await commonObject.assertMessage(calculateMonthlyAmount.txt_successMessage, enecoTestData.StroomGas.enecoSuccessMessage);
        logger.info("Test Case Passed");
    }catch (error) {
        logger.error("Test Case Failed", error);
        throw error;
    }
});


test('As a user, I should be able to fill the energy calculated amount form for Alleen gas', async () => {
    try{
        // Navigating to the entered area location
        await calculateMonthlyAmount.selectAreaForCalculateMonthlyAmount(
            enecoTestData.AlleenGas.enecoPostalCode,
            enecoTestData.AlleenGas.enecoHouseNo,
            enecoTestData.AlleenGas.enecofullAddressMessage
        );
        
        await commonObject.assertMessage(calculateMonthlyAmount.txt_calculatorPageHeader, enecoTestData.AlleenGas.enecoCaluatorHeaderText);
        
        // Prepare parameters for filling the form
        const formParams: FillCalculateMonthlyAmountFormParams = {
            energyType: "Alleen gas",
            energyConsumption: "Ja, ik vul mijn verbruik zelf",
            consumptionUnit:"4000",
            moving: "Nee, ik ga niet verhuizen",
            workLive: "Ja",
            phoneNumber: enecoTestData.AlleenGas.enecoPhonenumber,
            emailAddress: enecoTestData.AlleenGas.enecoEmailAddress,
            bankDetails: enecoTestData.AlleenGas.enecoBankDetails,
        };

        // Calculating the monthly amount energy
        await calculateMonthlyAmount.fillCalculateMonthlyAmountForm(formParams);
        
        await commonObject.assertMessage(calculateMonthlyAmount.txt_successMessage, enecoTestData.AlleenGas.enecoSuccessMessage);
        logger.info("Test Case Passed");
    }catch (error) {
        logger.error("Test Case Failed", error);
        throw error;
    }
});


test.afterEach(async ({page}) => {
    await page.close();
})
})