import { Selector } from 'testcafe';
import {t} from 'testcafe';

var jsonfile = require('jsonfile')
var file = './locators.json'
var jsonLocator = jsonfile.readFileSync(file);

var language = "ru";

export default class WelcomeProspectiveClientPage {

    constructor () {
        this.descriptionElement  = Selector(jsonLocator.WelcomeProspectiveClientPage.DescriptionElement.locator);
        this.headerElement       = Selector(jsonLocator.WelcomeProspectiveClientPage.HeaderElement.locator);
        this.buttonSubmit        = Selector(jsonLocator.WelcomeProspectiveClientPage.ButtonSubmit.locator);
    }

    async shouldDisplay () {
         await t
             .expect(this.descriptionElement.textContent).eql(jsonLocator.WelcomeProspectiveClientPage.DescriptionElement.ru)
             .expect(this.buttonSubmit.textContent).eql(jsonLocator.WelcomeProspectiveClientPage.ButtonSubmit.ru)
             .expect(this.buttonSubmit.exists).ok();
            
    }
}