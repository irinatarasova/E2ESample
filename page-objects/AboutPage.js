import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('./locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator =jsonfile.readFileSync(file);

const EMPTY_STRING       = '';

export default class AboutPage {

    constructor () {
       
        this.infoElementOptional    = Selector(properties.get('NewClientWelcomePage.InfoElementOptional'));      
        this.buttonSubmit           = Selector(properties.get('NewClientWelcomePage.ButtonSubmit'));        
        this.iAgreeCheckBox         = Selector(properties.get('NewClientWelcomePage.IAgreeCheckBox'));
        this.CheckBoxInfoLabel      = Selector(properties.get('NewClientWelcomePage.CheckBoxInfoLabel'));
        

        this.footerElement          = Selector(jsonLocator.AboutPage.FooterElement.locator);
        this.headerElement          = Selector(jsonLocator.AboutPage.HeaderElement.locator);
        this.generalWelcomeElement  = Selector(jsonLocator.AboutPage.GeneralWelcomeElement.locator);
        this.generalInfoElement     = Selector(jsonLocator.AboutPage.GeneralInfoElement.locator);

        this.lastNameInput          = Selector(jsonLocator.AboutPage.LastNameInput.locator);
        this.firstNameInput         = Selector(jsonLocator.AboutPage.FirstNameInput.locator);
        this.middleNameInput        = Selector(jsonLocator.AboutPage.MiddleNameInput.locator);

        this.emailInput             = Selector(jsonLocator.AboutPage.EmailInput.locator);
        this.buttonSubmit           = Selector(jsonLocator.AboutPage.ButtonSubmit.locator);
        this.iAgreeCheckBox         = Selector(jsonLocator.AboutPage.IAgreeCheckBox.locator);
        this.checkBoxInfoLabel      = Selector(jsonLocator.AboutPage.CheckBoxInfoLabel.locator);
        this.checkBoxInfoLink       = Selector(jsonLocator.AboutPage.CheckBoxInfoLink.locator);
        
        
    }

    async shouldDisplay () {
        await t
            .expect(this.headerElement.textContent).eql(jsonLocator.AboutPage.HeaderElement.ru)
            .expect(this.footerElement.textContent).eql(jsonLocator.AboutPage.FooterElement.ru)
            .expect(this.generalWelcomeElement.textContent).eql(jsonLocator.AboutPage.GeneralWelcomeElement.ru)
            .expect(this.generalInfoElement.textContent).eql(jsonLocator.AboutPage.GeneralInfoElement.ru)
            .expect(this.firstNameInput.textContent).eql(EMPTY_STRING)
            .expect(this.middleNameInput.textContent).eql(EMPTY_STRING)
            .expect(this.lastNameInput.textContent).eql(EMPTY_STRING)
            .expect(this.emailInput.textContent).eql(EMPTY_STRING)

           /* .expect(this.buttonSubmit.exists).ok()
            .exists(this.buttonSubmit.hasAttribute("disabled")).ok()
            .expect(this.buttonSubmit.textContent).eql(jsonLocator.AboutPage.ButtonSubmit.ru); */
            
    }
}