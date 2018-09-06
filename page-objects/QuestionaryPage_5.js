import { Selector } from 'testcafe';
import {t} from 'testcafe';

var PropertiesReader = require('properties-reader/src/PropertiesReader');
var properties = PropertiesReader('locators.properties');

var jsonfile = require('jsonfile')
var file = './locators.json'
var language = "ru";
var jsonLocator;
jsonLocator =jsonfile.readFileSync(file);

const util         = require('util');

export default class QuestionPage_5 {

    constructor () {  
        this.answerCount    = 4;// количество ответов на данной странице
        this.headerElement  = Selector(jsonLocator.QuestionaryPage_5.HeaderElement.locator);
        this.qNumberElement = Selector(jsonLocator.QuestionaryPage_5.QuestionNumber.locator);
        this.answer_1       = Selector(jsonLocator.QuestionaryPage_5.Answer_1.locator);
        this.answer_2       = Selector(jsonLocator.QuestionaryPage_5.Answer_2.locator);
        this.answer_3       = Selector(jsonLocator.QuestionaryPage_5.Answer_3.locator);
        this.answer_4       = Selector(jsonLocator.QuestionaryPage_5.Answer_4.locator);

        this.buttonSubmit   = Selector(jsonLocator.QuestionaryPage_5.ButtonSubmit.locator);
        this.backButton     = Selector(jsonLocator.QuestionaryPage_5.BackButton.locator);
        
        this.radioButtonAnswer_1   = Selector(jsonLocator.QuestionaryPage_5.RadioButtonAnswer_1.locator);
        this.radioButtonAnswer_2   = Selector(jsonLocator.QuestionaryPage_5.RadioButtonAnswer_2.locator);
        this.radioButtonAnswer_3   = Selector(jsonLocator.QuestionaryPage_5.RadioButtonAnswer_3.locator);
        this.radioButtonAnswer_4   = Selector(jsonLocator.QuestionaryPage_5.RadioButtonAnswer_4.locator);

    }
    /*
    Проверка что загрузились и отобразились все необходимые контролы на данной странице
    */
    async shouldDisplay () {

        await t
            .expect(this.headerElement.textContent).eql(jsonLocator.QuestionaryPage_5.HeaderElement.ru)
            .expect(this.qNumberElement.textContent).eql(jsonLocator.QuestionaryPage_5.QuestionNumber.ru)
            .expect(this.answer_1.textContent).eql(jsonLocator.QuestionaryPage_5.Answer_1.ru)
            .expect(this.answer_2.textContent).eql(jsonLocator.QuestionaryPage_5.Answer_2.ru)
            .expect(this.answer_3.textContent).eql(jsonLocator.QuestionaryPage_5.Answer_3.ru)
            .expect(this.answer_4.textContent).eql(jsonLocator.QuestionaryPage_5.Answer_4.ru)

            .expect(this.backButton.exists).ok()
            .expect(this.backButton.textContent).eql(jsonLocator.QuestionaryPage_5.BackButton.ru)

            .expect(this.buttonSubmit.exists).ok()
            .expect(this.buttonSubmit.textContent).eql(jsonLocator.QuestionaryPage_5.ButtonSubmit.ru)
            .expect(this.radioButtonAnswer_1.checked).eql(false)
            .expect(this.radioButtonAnswer_2.checked).eql(false)
            .expect(this.radioButtonAnswer_3.checked).eql(false)
            .expect(this.radioButtonAnswer_4.checked).eql(false);
            
    }
    /* 
    Кликает на указанный ответ
    */   
    async setAnswer (answerNumber) {
        if (answerNumber > this.answerCount) throw console.error('QuestionaryPage_5: impossible to set answer %s as total answer count is 4');
        
        switch(answerNumber) {
            case 1:
                await t
                    .click(this.answer_1)
                    .expect(this.radioButtonAnswer_1.checked).eql(true)
                break;
            case 2:
                await t
                    .click(this.answer_2)
                    .expect(this.radioButtonAnswer_2.checked).eql(true)
                break;
            case 3:
                await t
                    .click(this.answer_3)
                    .expect(this.radioButtonAnswer_3.checked).eql(true)
                break;
            case 4:
                await t
                    .click(this.answer_4)
                    .expect(this.radioButtonAnswer_4.checked).eql(true)
                break;
            default:
                console.error(util.format('QuestionaryPage_5: impossible to set answer %s as total answer count is %s'), answerNumber, this.answerCount);
        } 

    }
}