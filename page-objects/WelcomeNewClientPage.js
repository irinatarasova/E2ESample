import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var jsonLocator = jsonfile.readFileSync(file);

var language = "ru";

export default class WelcomeNewClientPage {

    constructor () {
          
    
        this.headerElement       = Selector(jsonLocator.WelcomeNewClientPage.HeaderElement.locator);
    }

    async shouldDisplay () {
         await t
             .expect(this.headerElement.textContent).eql(jsonLocator.WelcomeNewClientPage.HeaderElement.ru)
             
            
    }
}