import { type Locator, type Page } from '@playwright/test';
import { logger } from '../utils/reporter-utility';
import { CommonMethod } from '../utils/common-ui-utility';
import enecoTestData from "../test-data/personal-details/personal-test-data.json"

/**
 * Parameters for filling the energy calculated amount form.
 */
export interface FillCalculateMonthlyAmountFormParams {
    energyType: "Stroom & gas" | "Alleen gas" | "Alleen stroom";
    energyConsumption: "Ja, ik vul mijn verbruik zelf" | "Nee, help mij inschatten";
    consumptionUnit: string;
    householdSize?: "persoon" | "2 personen" | "3 personen" | "4 personen" | "of meer";
    houseType?: "Appartement" | "Tussenwoning" | "Hoekwoning" | "onder 1 kap" | "Vrijstaand";
    homeBuild?: "Voor" | "Tussen 1945 en" | "Na 2000" | "Ik weet het bouwjaar niet";
    moving?: "Ja, ik ga verhuizen" | "Nee, ik ga niet verhuizen";
    workLive?: "Ja" | "Nee";
    phoneNumber?: string;
    emailAddress?: string;
    bankDetails?: string;
    smartMeter?: "Ja, ik wek zelf stroom op" | "Nee, ik heb geen slimme meter";
    solarPanels?: "Ja, ik wek zelf stroom op" | "Nee, ik heb geen slimme meter";
    powerGrid?: string
}
export class CalculateMonthlyAmount {
    commonObject = new CommonMethod(this.page);
    constructor(public page: Page,
        readonly btn_accpetnce: Locator = page.getByRole('button', { name: 'Accepteren' }),
        readonly tb_postalCode: Locator = page.getByPlaceholder('AB'),
        readonly tb_houseNO: Locator = page.getByPlaceholder('0'),
        readonly txt_allAddressMessage: Locator = page.getByText('Irislaan 63, 9713RD GRONINGEN'),
        readonly txt_calculatorPageHeader: Locator = page.getByText("Welk type energie wil je in je berekening?"),
        readonly btn_calculateMonthlyAmount: Locator = page.getByRole('button', { name: 'Bereken je maandbedrag' }),
        readonly btn_next: Locator = page.getByRole('button', { name: 'Volgende' }),
        readonly tb_powerGrid: Locator = page.getByPlaceholder('1234'),
        readonly tb_firstName: Locator = page.getByPlaceholder('Peter'),
        readonly tb_intials: Locator = page.getByPlaceholder('A.B.'),
        readonly tb_surname: Locator = page.getByPlaceholder('Vries'),
        readonly tb_day: Locator = page.locator("//input[@name='day']"), 
        readonly tb_month: Locator = page.locator("//input[@name='month']"),
        readonly tb_year: Locator = page.locator("//input[@name='year']"),
        readonly tb_phoneNumber: Locator = page.getByPlaceholder("0612345678"),
        readonly tb_emailAddress: Locator = page.getByPlaceholder("mijn@email.nl"),
        readonly btn_checkYourOrder: Locator = page.getByText("Controleer je bestelling"),
        readonly tb_bankAccount: Locator = page.getByPlaceholder("NL12 BANK 0123 4567 89"),
        readonly btn_registerAndPay: Locator = page.getByText("Aanmelden en maandelijks betalen"),
        readonly btn_toYourData: Locator = page.getByText("Naar je gegevens"),
        readonly btn_toYourOffer: Locator = page.getByText("Naar je aanbod"),
        readonly txt_successMessage: Locator = page.getByText("Bedankt voor je bestelling"),
    ) {
    }

    /**
     * Selects an area by filling in the postal code and house number,
     * and then verifies the full address message before proceeding to calculate the monthly amount.
     * @param postalCode - The postal code of the area to be entered.
     * @param houseNo - The house number corresponding to the postal code.
     * @param fullAddressMessage - The expected message that confirms the full address after input.
     * @returns A promise that resolves when the area selection is complete.
     * @throws Error if there is an issue during the process.
     */
    async selectAreaForCalculateMonthlyAmount(
        postalCode: string,
        houseNo: string,
        fullAddressMessage: string,
    ):Promise<void>{
        try{
            await this.tb_postalCode.fill(postalCode);
            await this.tb_houseNO.fill(houseNo);
            await this.txt_allAddressMessage1.waitFor({state: 'visible'});
            await this.commonObject.assertMessage(this.txt_allAddressMessage,fullAddressMessage);
            await this.btn_calculateMonthlyAmount.click();
            logger.info("Successfully Navigated to the Calculate Amount Form");
        }catch(error){
            logger.error("Getting error while Navigating the Calculate Amount Form", error);
        }
    }


    /**
     * Fills out the energy calculated amount form using the provided parameters.
     * This method sequentially checks and fills in form fields based on user input.
     * @param params - An object containing all necessary parameters for filling the form.
     * @param params.energyType - The type of energy selected by the user.
     * @param params.energyConsumption - Indicates if the user will provide their own consumption data.
     * @param params.householdSize - The size of the household.
     * @param params.houseType - The type of house.
     * @param params.homeBuild - The estimated year of construction of the house.
     * @param params.moving - Indicates if the user is moving.
     * @param params.workLive - Indicates if the user works from home.
     * @param params.phoneNumber - The user's phone number.
     * @param params.emailAddress - The user's email address.
     * @param params.bankDetails - The user's bank details for payment processing.
     * @param params.smartMeter - Optional field indicating if the user has a smart meter.
     * @param params.solarPanels - Optional field indicating if the user has solar panels.
     * @param params.powerGrid - Optional field for additional information about the power grid.
     * @returns A promise that resolves when the form is successfully filled out and submitted.
     * @throws Error if there is an issue during the form filling process.
     */
    async fillCalculateMonthlyAmountForm(
        params: FillCalculateMonthlyAmountFormParams
        ):Promise<void> {
        try {
            const { energyType, energyConsumption, consumptionUnit, householdSize, houseType, homeBuild, moving, workLive, phoneNumber, emailAddress, bankDetails, smartMeter, solarPanels, powerGrid } = params;
    
            await this.checkAndProceed(energyType);
            await this.checkAndProceed(energyConsumption);
            if(energyConsumption === 'Ja, ik vul mijn verbruik zelf'){
                await this.tb_powerGrid.fill(consumptionUnit);
                await this.btn_next.click();
            }else{
                if(householdSize){
                    await this.checkAndProceed(householdSize);}
                if(houseType) await this.checkAndProceed(houseType);
                if(homeBuild) await this.checkAndProceed(homeBuild);
                
                if (smartMeter) await this.checkAndProceed(smartMeter);
                if (solarPanels) await this.checkAndProceed(solarPanels);
                if (powerGrid) {
                    await this.tb_powerGrid.fill(powerGrid);
                    await this.btn_next.click();
                }
            }
            if(moving){
                await this.checkAndProceed(moving);
                await this.btn_next.click();
            }
            
            if (energyType !== 'Alleen stroom') await this.btn_toYourOffer.click();
            
            await this.btn_toYourData.click();
            await this.btn_next.click();
            if(workLive) await this.checkAndProceed(workLive);
    
            await this.enterPersonalDetails('Dhr.',enecoTestData.enecoFirstName,enecoTestData.enecoIntials,enecoTestData.enecoSurname,enecoTestData.enecoDate,enecoTestData.enecoMonth,enecoTestData.enecoYear);
            if(phoneNumber) await this.tb_phoneNumber.fill(phoneNumber);
            if(emailAddress) await this.tb_emailAddress.fill(emailAddress);
            await this.btn_checkYourOrder.click();
            if(bankDetails) await this.tb_bankAccount.fill(bankDetails);
            await this.btn_registerAndPay.click();
            logger.info(`Successfully filled the form for ${energyType}`);
        } catch (error) {
            logger.error(`Error while filling the form for ${params.energyType}: ${error}`);
        }
    }
    
    /**
     * Checks a form field identified by its label and then proceeds to the next step.
     * @param label - The label of the form field to be checked.
     * This label should correspond to the specific input or option in the form.
     * @returns A promise that resolves when the field is checked and the next button is clicked.
     * @throws Error if there is an issue during the check or click process.
     */
    private async checkAndProceed(
        label: string
        ):Promise<void>{
        await this.page.getByLabel(label).check();
        await this.btn_next.click();
    }
    

    /**
     * Enters personal details into the form and proceeds to the next step.
     * @param selectSalutation - The salutation for the user, which can be "Dhr." or "Mevr.".
     * @param firstName - The user's first name.
     * @param intials - The user's initials.
     * @param surname - The user's surname.
     * @param date - The user's birth date (day).
     * @param month - The user's birth month.
     * @param year - The user's birth year.
     * @returns A promise that resolves when the personal details are successfully entered and the next button is clicked.
     * @throws Error if there is an issue during the entry of personal details.
     */
    async enterPersonalDetails(
        selectSalutation: "Dhr." | "Mevr.",
        firstName: string,
        intials: string,
        surname: string,
        date: string,
        month: string,
        year: string
    ):Promise<void>{
        try{
            await this.page.getByLabel(selectSalutation).check();
            await this.tb_firstName.fill(firstName);
            await this.tb_intials.fill(intials);
            await this.tb_surname.fill(surname);
            await this.tb_day.fill(date);
            await this.tb_month.fill(month);
            await this.tb_year.fill(year);
            await this.btn_next.click(); 
            logger.info("Personally details entered");
        }catch(error){
            logger.error("Getting error while entering the personal details");
        }
    }

}
