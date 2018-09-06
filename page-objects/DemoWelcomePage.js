import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator =jsonfile.readFileSync(file);

export default class DemoLoginPage {

    constructor () {  
        this.btnSubmit      = Selector(jsonLocator.DemoWelcomePage.ButtonSubmit.locator);
        this.footerElement  = Selector(jsonLocator.DemoWelcomePage.FooterElement.locator);
        this.headerElement  = Selector(jsonLocator.DemoWelcomePage.HeaderElement.locator);
    }

    async shouldDisplay () {
        await t
            .expect(this.headerElement.textContent).eql(jsonLocator.DemoWelcomePage.HeaderElement.ru)
            .expect(this.footerElement.textContent).eql(jsonLocator.DemoWelcomePage.FooterElement.ru)
            .expect(this.btnSubmit.exists).ok()
            .expect(this.btnSubmit.textContent).eql(jsonLocator.DemoWelcomePage.ButtonSubmit.ru);
            
    }
}