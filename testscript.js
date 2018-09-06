import DemoLoginPage            from './page-objects/DemoLoginPage';
import DemoWelcomePage          from './page-objects/DemoWelcomePage';
import ClientRegisterPage       from './page-objects/ClientRegisterPage';
import SMSPage                  from './page-objects/SMSPage';
import AboutPage                from './page-objects/AboutPage';
import WelcomeActiveClientPage  from './page-objects/WelcomeActiveClientPage';

import { Selector } from 'testcafe';


/*--------------VARIABLES----------------*/
var language = "ru"; // available values {ru, eng} - reference to locators.json

// Declare Locators Json file for reading [accessing to it's data values]
var jsonfile = require('jsonfile')
var file = './locators.json'

var jsonLocator;
jsonLocator = jsonfile.readFileSync(file);

// to access config properties
var PropertiesReader = require('properties-reader/src/PropertiesReader');
var config = PropertiesReader('./config.properties');

/*--------------CONSTANTS----------------*/
const EMPTY_STRING       = '';
const INVALID_SMS_CODE   = '123456';
const url                = config.get('demoStartPage');
const util               = require('util');
const TEST_SPEED         = 0.5; // Must be a number between 1 (the fastest) and 0.01 (the slowest).

fixture `Getting Started`
    .page `http://app_url/demo`; 

var tools = require('./helpers/utils');

/*
==========================================================================================
==========================================================================================
Тест: Неверный смс-код  при Регистрация Нового Клиента через Демо-доступ
TestCase
- ФС привлекает клиента и регистрирует через Демо-доступ
- При регистрации необходимо ввести смс-код

Тест Кейс
- Пользователь вводит свой номер тел
- Пользователь вводит неверный смс-код [для текущей реализации заглушки 123456]
==========================================================================================
==========================================================================================
*/
test.skip('Register New Client:: InCorrect sms-code flow', async t =>{
    //const INVALID_SMS_CODE   = config.get('invalidSMSCode');
    
    const demopage = new DemoLoginPage();
    demopage.shouldDisplay();

    await t
        .maximizeWindow()
        .setTestSpeed(TEST_SPEED)
        .typeText(demopage.emailInput, tools.randomAdvisorEmail())    //ввод в поле корректный email
        .click(demopage.btnSubmit);
    
    const welcomePage = new DemoWelcomePage();
    welcomePage.shouldDisplay();

    await t
        .click(welcomePage.btnSubmit);
    
    const registerPage = new ClientRegisterPage(); 
    registerPage.shouldDisplay();

    //await t
    //    .expect(registerPage.headerElement.textContent).eql(jsonLocator.ClientRegisterPage.HeaderElement.ru)
    //    .expect(registerPage.footerElement.textContent).eql(jsonLocator.ClientRegisterPage.FooterElement.eng)  

    const phone = tools.randomPhoneNumber();
    var outString = util.format('%s +7 (%s) %s %s %s', jsonLocator.SMSCodePage.CodeSentInfo.ru, phone.substr(0,3), phone.substr(3,3), phone.substr(6,2), phone.substr(8,2));
    await t
        .typeText(registerPage.phoneInput, phone)
        .click(registerPage.btnSubmit);
    
    const smsPage = new SMSPage(); 
    smsPage.shouldDisplay();

    await t
        .expect(smsPage.codeInput.hasAttribute('disabled')).notOk()
        .expect(smsPage.codeInput.textContent).eql(EMPTY_STRING)
        .expect(smsPage.codeSentInfoElement.textContent).eql(outString)
        .typeText(smsPage.codeInput, INVALID_SMS_CODE) 
    //TROUBLE
    /* const btn = smsPage.reSendCodeBtn.find("button[action=button]")
    if(await btn.exists && await btn.visible)
        console.log('BUTTON')
        else console.log('NO BUTTON')
        //.expect(smsPage.reSendCodeBtn.visible).ok() */   
});  

/*
==========================================================================================
==========================================================================================
Тест: Проверка UI элементов страницы
- email пустой
- кнопка disabled
- кнопка enabled только при введении валидного email [TBD :: будет enabled только с доменом bcs]
==========================================================================================
==========================================================================================
 */
test.skip('Demo Login Page:: Basic steps to verify UI controls', async t => {

const demopage = new DemoLoginPage();
demopage.shouldDisplay(); 

await t
    .maximizeWindow()
    .setTestSpeed(TEST_SPEED)
    .expect(demopage.emailInput.value).eql(EMPTY_STRING)                //проверка что поле EMAIL пусто
    .expect(demopage.btnSubmit.hasAttribute('disabled')).ok()           //кнопка disabled
        
    .typeText(demopage.emailInput, ' ')                                 //email:: ввод в поле пробела
    .expect(demopage.emailInput.value).eql(EMPTY_STRING)                         //проверка что поле содержит введенное значение
    .expect(demopage.btnSubmit.hasAttribute('disabled')).ok()           //кнопка disabled
        
    .typeText(demopage.emailInput, 'email', { replace: true })          //ввод в поле некорректный email
    .expect(demopage.emailInput.value).eql('email')                     //проверка что поле содержит введенное значение
    .expect(demopage.btnSubmit.hasAttribute('disabled')).ok()           //кнопка disabled

    .typeText(demopage.emailInput, 'email@', { replace: true })         //ввод в поле некорректный email
    .expect(demopage.emailInput.value).eql('email@')                    //проверка что поле содержит введенное значение
    .expect(demopage.btnSubmit.hasAttribute('disabled')).ok()           //кнопка disabled

    .typeText(demopage.emailInput, 'email@gmail', { replace: true })    //ввод в поле некорректный email
    .expect(demopage.emailInput.value).eql('email@gmail')               //проверка что поле содержит введенное значение
    .expect(demopage.btnSubmit.hasAttribute('disabled')).ok()           //кнопка disabled

    .typeText(demopage.emailInput, 'email@gmail.', { replace: true })   //ввод в поле некорректный email
    .expect(demopage.emailInput.value).eql('email@gmail.')              //проверка что поле содержит введенное значение
    .expect(demopage.btnSubmit.hasAttribute('disabled')).ok()           //кнопка disabled

    .typeText(demopage.emailInput, 'email@gmail.ru', { replace: true }) //ввод в поле корректный email
    .expect(demopage.emailInput.value).eql('email@gmail.ru')            //проверка что поле содержит введенное значение
    //TBD :: Должно быть реализовано иначе - кнопка enabled только когда домен содержит bcs
    .expect(demopage.btnSubmit.hasAttribute('disabled')).notOk()        //кнопка 
}); 

/*
==========================================================================================
==========================================================================================
Тест: Авторизация валидного ФС
TestCase
- авторизуется валидный ФС
==========================================================================================
==========================================================================================
*/
test.skip('Demo Login Page:: Valid Advisor login', async t =>{

const demopage = new DemoLoginPage();
demopage.shouldDisplay();
const validEmail = tools.randomAdvisorEmail();
await t
    .maximizeWindow()
    .setTestSpeed(TEST_SPEED)

    .typeText(demopage.emailInput, validEmail)    //ввод в поле корректный email
    .expect(demopage.emailInput.value).eql(validEmail)  
    .click(demopage.btnSubmit);

const welcomePage = new DemoWelcomePage();
welcomePage.shouldDisplay();
});  


/*
==========================================================================================
==========================================================================================
Тест: Попытка залогиниться под несуществующим пользователем
Реализация заглушки *** имеет логику 
- если email домен содержит bcs то это валидный пользователь ФС
- если email домен не содержит bcs то невалидный пользователь ФС
TestCase
- вводится невалидный email [в нашем случае домен не содержит bcs]
- ожидается ответ - С указанным e-mail не найден пользователь в ***
==========================================================================================
==========================================================================================
 */
test.skip('Demo Login Page:: Login invalid user', async t => {  
    
    const demopage = new DemoLoginPage();
    demopage.shouldDisplay();

    await t
        .maximizeWindow()
        .setTestSpeed(TEST_SPEED)
        .typeText(demopage.emailInput, tools.randomClientEmail())    // non-bcs person
        .click(demopage.btnSubmit);

    const errSpan = await demopage.errorElement.find("span");
    const errDiv =  demopage.emailInput.parent('div.form-control-is-invalid');
    await t
        .expect(errSpan.exists).ok()                            //элемент <span> с текстом-ошибкой существует
        .expect(errSpan.textContent).eql(config.get("err_UserNotFoundInCRM_general"));// проверка текста ошибки
        
            
        //await t.expect(errDiv.exists).ok(); 
}
);   

/*
==========================================================================================
==========================================================================================
Тест: Попытка залогиниться под пользователем который не-активен (к примеру уволенный ФС)
Реализация заглушки *** имеет логику 
- если email = inactiveAdvisor@domain.ru то вернет
     "С указанным e-mail не найден пользователь в ***"
TestCase
- вводится невалидный email [в нашем случае inactiveAdvisor@bcs.ru]
- ожидается ответ - С указанным e-mail не найден пользователь в ***
==========================================================================================
==========================================================================================
 */
test.skip('Demo:: Login invalid advisor', async t => {
    const demopage = new DemoLoginPage();
    demopage.shouldDisplay();
    await t
        .maximizeWindow()
        .setTestSpeed(TEST_SPEED)
        .expect(demopage.btnSubmit.withAttribute('disabled')).ok()   //submit button is disabled
       // .expect(btnSubmit.exists).ok() //email input exists
        .expect(demopage.emailInput.innerText).eql(EMPTY_STRING)               //email input is empty by default
        .expect(demopage.btnSubmit.hasAttribute('disabled'));       // кнопка осталась disabled
        await t   
            //.typeText(demopage.emailInput, 'inactiveAdvisor@bcs.ru')         // non-bcs person
            //.expect(demopage.emailInput.value).eql('inactiveAdvisor@bcs.ru')
            .typeText(demopage.emailInput, config.get("inactiveAdvisorEmail"))
            .expect(demopage.emailInput.value).eql(config.get("inactiveAdvisorEmail"))
            .expect(demopage.btnSubmit.hasAttribute("disabled")).notOk()
            .click(demopage.btnSubmit);


        const errDiv = demopage.emailInput.parent('div.form-control-is-invalid'); // проверка что есть красный конутр
        await t.expect(errDiv.exists).ok();

        const err = await demopage.errorElement.find("span"); //проверка текств ошибки
        await t.expect(err.textContent).eql(config.get("err_UserNotFoundIn***"));
        
}); 

/*
==========================================================================================
==========================================================================================
Тест: Попытка залогиниться под пользователем для которого найдено несколько записей в ***
Реализация заглушки *** имеет логику 
- если email = multipleAdvisor@bcs.ru то вернет
     "С указанным e-mail найдено больше одного пользователя в ***"
TestCase
- вводится невалидный email [в нашем случае multipleAdvisor@bcs.ru]
- ожидается ответ - С указанным e-mail найдено больше одного пользователя в ***
==========================================================================================
==========================================================================================
 */
test.skip('Demo:: Login advisor with multiple accounts in ***', async t => {
    const demopage = new DemoLoginPage();
    demopage.shouldDisplay();
    await t
        .maximizeWindow()
        .setTestSpeed(TEST_SPEED)
        .expect(demopage.btnSubmit.withAttribute('disabled')).ok()   //submit button is disabled
       // .expect(btnSubmit.exists).ok() //email input exists
        .expect(demopage.emailInput.innerText).eql(EMPTY_STRING)               //email input is empty by default
        .expect(demopage.btnSubmit.hasAttribute('disabled'));       // кнопка осталась disabled
        await t   
            //.typeText(demopage.emailInput, 'inactiveAdvisor@bcs.ru')         // non-bcs person
            //.expect(demopage.emailInput.value).eql('inactiveAdvisor@bcs.ru')
            .typeText(demopage.emailInput, config.get("multipleAdvisorEmail"))
            .expect(demopage.emailInput.value).eql(config.get("multipleAdvisorEmail"))
            .expect(demopage.btnSubmit.hasAttribute("disabled")).notOk()
            .click(demopage.btnSubmit);


        const errDiv = demopage.emailInput.parent('div.form-control-is-invalid'); // проверка что есть красный конутр
        await t.expect(errDiv.exists).ok();

        const err = await demopage.errorElement.find("span"); //проверка текств ошибки
        await t.expect(err.textContent).eql(config.get("err_MultipleUserInCRM"));
        
}); 

/*
==========================================================================================
==========================================================================================
Тест: Регистрация Нового Клиента через Демо-доступ
TestCase
- ФС привлекает клиента и регистрирует через Демо-доступ
==========================================================================================
==========================================================================================
*/
test.skip('Register New Client:: Valid Advisor login', async t =>{
    
    const demopage = new DemoLoginPage();
    demopage.shouldDisplay();
   
    await t
        .maximizeWindow()
        .setTestSpeed(TEST_SPEED)
        .typeText(demopage.emailInput, tools.randomAdvisorEmail())    //ввод в поле корректный email
        .click(demopage.btnSubmit);
    
    const welcomePage = new DemoWelcomePage();
    welcomePage.shouldDisplay();
    
    await t
        .click(welcomePage.btnSubmit);
    
    const registerPage = new ClientRegisterPage(); 
    registerPage.shouldDisplay();

/*     await t.click(registerPage.enterByLoginPswd)
    const docURI = await t.eval(() => document.documentURI);
    if (docURI != config.get('bcsOnLineStartPage'))
        console.dir('URI TROUBLE');   */
    const phoneNumber = tools.randomPhoneNumber();

    await t
        .typeText(registerPage.phoneInput, phoneNumber)
        .click(registerPage.btnSubmit);

    const smsPage = new SMSPage(); 
    smsPage.shouldDisplay();

    await t.click(smsPage.backButton);
    registerPage.shouldDisplay();

    await t
        .typeText(registerPage.phoneInput, phoneNumber)
        .click(registerPage.btnSubmit);

    await t
        .typeText(smsPage.codeInput, tools.randomSMSCode());

    const aboutPage = new AboutPage(); 
    aboutPage.shouldDisplay();

    await t
        .typeText(aboutPage.lastNameInput, tools.randomString())
        .typeText(aboutPage.middleNameInput, tools.randomString())
        .typeText(aboutPage.firstNameInput, tools.randomString())
        .typeText(aboutPage.emailInput, tools.randomClientEmail())
        .click(aboutPage.iAgreeCheckBox)
        //.rightClick(aboutPage.checkBoxInfoLink, )
        //.click(aboutPage.checkBoxInfoLink, {ctrl:true})
        //.act.rclick(aboutPage.checkBoxInfoLink)
        .click(aboutPage.buttonSubmit);
        //act.rclick(aboutPage.checkBoxInfoLink);  
});  


/*
==========================================================================================
==========================================================================================
Тест: Регистрация Действующего Клиента через ЛК ПК
TestCase
- Пользователь (Клиент) вводит свой номер тел (hardcoded on sever mock side as Active Client)
- Система распознает его как Действующего
==========================================================================================
==========================================================================================
*/
test
    .page `http://ecse00100f48.epam.com/#/authbyphone`
    ('Register Active Client', async t =>{
    
    const registerPage = new ClientRegisterPage(); 
    registerPage.shouldDisplay();
    const phoneNumber = config.get('activeClientCell');
        console.dir('phoneNumber='+phoneNumber)
    await t
        .maximizeWindow()
        .setTestSpeed(TEST_SPEED);
    
        await t
        .typeText(registerPage.phoneInput, phoneNumber)
        .click(registerPage.btnSubmit);

    const smsPage = new SMSPage(); 
    smsPage.shouldDisplay();

    await t
        .typeText(smsPage.codeInput, tools.randomSMSCode());

    const welcomePage = new WelcomeActiveClientPage(); 
    welcomePage.shouldDisplay();
});  
