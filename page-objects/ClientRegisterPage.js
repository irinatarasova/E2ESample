import { Selector, t } from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('./locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator =jsonfile.readFileSync(file);

export default class ClientRegisterPage {

    constructor () {
        this.phoneInput         = Selector(jsonLocator.ClientRegisterPage.PhoneInput.locator);
        this.btnSubmit          = Selector(jsonLocator.ClientRegisterPage.ButtonSubmit.locator);
        this.enterByLoginPswd   = Selector(jsonLocator.ClientRegisterPage.EnterByLoginPswdBtn.locator);
        this.infoElement        = Selector(jsonLocator.ClientRegisterPage.InfoElement.locator);
        this.footerElement      = Selector(jsonLocator.ClientRegisterPage.FooterElement.locator);
        this.headerElement      = Selector(jsonLocator.ClientRegisterPage.HeaderElement.locator);
    }

    async shouldDisplay () {
        await t
            .expect(this.headerElement.textContent).eql(jsonLocator.ClientRegisterPage.HeaderElement.ru)
            .expect(this.footerElement.textContent).eql(jsonLocator.ClientRegisterPage.FooterElement.ru)  
    }
}