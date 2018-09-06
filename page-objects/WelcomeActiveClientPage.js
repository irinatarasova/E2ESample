import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var jsonLocator = jsonfile.readFileSync(file);

var language = "ru";

export default class WelcomeActiveClientPage {

    constructor () {
          
        this.footerElement       = Selector(jsonLocator.WelcomeActiveClientPage.FooterElement.locator);
        this.headerElement       = Selector(jsonLocator.WelcomeActiveClientPage.HeaderElement.locator);
    }

    async shouldDisplay () {
         await t
             .expect(this.headerElement.textContent).eql(jsonLocator.WelcomeActiveClientPage.HeaderElement.ru)
             .expect(this.footerElement.textContent).eql(jsonLocator.WelcomeActiveClientPage.FooterElement.ru);
            
    }
}