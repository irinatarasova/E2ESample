import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator = jsonfile.readFileSync(file);

const util              = require('util');
const DEFAULT_PROFILE   = 'Консервативный';

export default class AnotherProfilesPage {

    constructor () {  
        this.backToQuestionary      = Selector(jsonLocator.AnotherProfilesPage.BackToQuestionary.locator);
        this.profileTitle           = Selector(jsonLocator.AnotherProfilesPage.ProfileTitle.locator);
        this.investProgressElement  = Selector(jsonLocator.AnotherProfilesPage.InvestProgressElement.locator);
        this.profileDescription     = Selector(jsonLocator.AnotherProfilesPage.ProfileDescription.locator);
        this.investProfile_1        = Selector(jsonLocator.AnotherProfilesPage.InvestProfile_1.locator);
        this.investProfile_2        = Selector(jsonLocator.AnotherProfilesPage.InvestProfile_2.locator);
        this.investProfile_3        = Selector(jsonLocator.AnotherProfilesPage.InvestProfile_3.locator);
        this.investProfile_4        = Selector(jsonLocator.AnotherProfilesPage.InvestProfile_4.locator);
        this.investProfile_5        = Selector(jsonLocator.AnotherProfilesPage.InvestProfile_5.locator);
        this.investProfile_6        = Selector(jsonLocator.AnotherProfilesPage.InvestProfile_6.locator);
    }
    /*
    Проверка что загрузились и отобразились все необходимые контролы на данной странице
    */
    async shouldDisplay () {
        
        await t
            .expect(this.profileTitle.textContent).eql(DEFAULT_PROFILE)
            .expect(this.backToQuestionary.textContent).eql(jsonLocator.AnotherProfilesPage.BackToQuestionary.ru)
            
            .expect(this.investProgressElement.exists).ok()

            
    }
/** Выделяет указанный профиль на элементе, index [1-6] */
    async selectProfile (index) {
        switch(index) {
            case 1:
                await t
                    .click(this.investProfile_1)
                    .expect(this.investProfile_1.hasClass("active-invest")).eql(true)
                    .expect(this.profileTitle.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_1.title.ru)
                    .expect(this.profileDescription.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_1.description.ru)
                break;
            case 2:
                await t
                    .click(this.investProfile_2)
                    .expect(this.investProfile_2.hasClass("active-invest")).eql(true)
                    .expect(this.profileTitle.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_2.title.ru)
                    .expect(this.profileDescription.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_2.description.ru)
                break;
            case 3:
                await t
                    .click(this.investProfile_3)
                    .expect(this.investProfile_3.hasClass("active-invest")).eql(true)
                    .expect(this.profileTitle.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_3.title.ru)
                    .expect(this.profileDescription.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_3.description.ru)
                break;
            case 4:
                await t
                    .click(this.investProfile_4)
                    .expect(this.investProfile_4.hasClass("active-invest")).eql(true)
                    .expect(this.profileTitle.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_4.title.ru)
                    .expect(this.profileDescription.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_4.description.ru)
                break;
            case 5:
                await t
                    .click(this.investProfile_5)
                    .expect(this.investProfile_5.hasClass("active-invest")).eql(true)
                    .expect(this.profileTitle.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_5.title.ru)
                    .expect(this.profileDescription.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_5.description.ru)
                break;
            case 6:
                await t
                    .click(this.investProfile_6)
                    .expect(this.investProfile_6.hasClass("active-invest")).eql(true)
                    .expect(this.profileTitle.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_6.title.ru)
                    .expect(this.profileDescription.textContent).eql(jsonLocator.AnotherProfilesPage.Profile_6.description.ru)
                break;
            // default:
            //     console.error(util.format(''));
        } 

            
    }
   
}