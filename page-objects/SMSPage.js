import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var jsonLocator = jsonfile.readFileSync(file);

var language = "ru";

export default class SMSPage {

    constructor () {
        //SMS-code input
        this.codeInput           = Selector(jsonLocator.SMSCodePage.CodeInput.locator);
        //back-arrow button
        this.backButton          = Selector(jsonLocator.SMSCodePage.BackButton.locator);
        //button re-send-code
        this.reSendCodeBtn       = Selector(jsonLocator.SMSCodePage.SendSMSCodeAgainBtn.locator);
        //span Код отправлен на номер
        this.codeSentInfoElement = Selector(jsonLocator.SMSCodePage.CodeSentInfo.locator);
       
        this.footerElement       = Selector(jsonLocator.SMSCodePage.FooterElement.locator);
        this.headerElement       = Selector(jsonLocator.SMSCodePage.HeaderElement.locator);
    }

    async shouldDisplay () {
         await t
             .expect(this.headerElement.textContent).eql(jsonLocator.SMSCodePage.HeaderElement.ru)
             .expect(this.footerElement.textContent).eql(jsonLocator.SMSCodePage.FooterElement.ru);
            
    }
}