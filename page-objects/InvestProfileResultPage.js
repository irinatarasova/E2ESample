import { Selector } from 'testcafe';
import {t} from 'testcafe';

// var PropertiesReader = require('properties-reader/src/PropertiesReader');
// var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator =jsonfile.readFileSync(file);

const util         = require('util');

export default class InvestProfileResultPage {

    constructor () {  
        this.headerElement          = Selector(jsonLocator.InvestProfileResultPage.HeaderElement.locator);
        this.clientProfileTitle     = Selector(jsonLocator.InvestProfileResultPage.ClientProfile.locator);
        this.anotherProfilesLink    = Selector(jsonLocator.InvestProfileResultPage.AnotherProfilesLink.locator);
        this.buttonSubmit           = Selector(jsonLocator.InvestProfileResultPage.ButtonSubmit.locator);
        this.answerAgain            = Selector(jsonLocator.InvestProfileResultPage.AnswerAgain.locator);
    }
    /*
    Проверка что загрузились и отобразились все необходимые контролы на данной странице
    */
    async shouldDisplay () {

        await t
            //TBD :: DEFECT EF-830
            //.expect(this.headerElement.textContent).eql(jsonLocator.InvestProfileResultPage.HeaderElement.ru)
            
            .expect(this.anotherProfilesLink.textContent).eql(jsonLocator.InvestProfileResultPage.AnotherProfilesLink.ru)
            .expect(this.anotherProfilesLink.exists).ok()

            .expect(this.buttonSubmit.exists).ok()
            .expect(this.buttonSubmit.textContent).eql(jsonLocator.InvestProfileResultPage.ButtonSubmit.ru)
            
            .expect(this.answerAgain.exists).ok()
            .expect(this.answerAgain.textContent).eql(jsonLocator.InvestProfileResultPage.AnswerAgain.ru)
    }
   
}