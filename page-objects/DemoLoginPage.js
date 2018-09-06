import { Selector, t } from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('./locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator =jsonfile.readFileSync(file);

export default class DemoLoginPage {

    constructor () {
       this.footerElement   = Selector(jsonLocator.DemoLoginPage.FooterElement.locator);
       this.headerElement   = Selector(jsonLocator.DemoLoginPage.HeaderElement.locator);
       this.emailInput      = Selector(jsonLocator.DemoLoginPage.EmailInput.locator); 
       this.btnSubmit       = Selector(jsonLocator.DemoLoginPage.ButtonSubmit.locator); 
       this.errorElement    = Selector(jsonLocator.DemoLoginPage.ErrorElement.locator);
    }

    async shouldDisplay () {
        await t
            .expect(this.headerElement.textContent).eql(jsonLocator.DemoLoginPage.HeaderElement.ru)
            .expect(this.footerElement.textContent).eql(jsonLocator.DemoLoginPage.FooterElement.ru)
            
    }
}