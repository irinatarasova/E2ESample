
const util = require('util');
module.exports = {
  /*Generates random phoneNumber, allowed symbols [0-9], length 10*/
  randomPhoneNumber: function () {
      var text = "";
      var possible = "0123456789";
      
      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      
      return text;
    },
    
    /*Generates SMS-code, 6 digits, excluding "123456"  as it's hardcoded on back as invalid sms-code */
    randomSMSCode: function () {
      var text = "";
      var possible = "0123456789";
      var exlude = "123456"
      for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      if (text!= exlude)
        return text
        else return "654321";
    },

    /*Generates random string for Name, MidName, LastName */
    randomString: function () {
      var text = "";
      var possible = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдеёжзийклмнопрстуфхцчшщэюя";
  
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  
      return text;
     
    },

    /*Generates random valid Advisor email with domain part -bcs- */
    randomAdvisorEmail: function () {
      var localPart = "";
      var domainPart = "";
      var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
      for (var i = 0; i < 5; i++)
        localPart += possible.charAt(Math.floor(Math.random() * possible.length));
      for (var i = 0; i < 2; i++)
      domainPart += possible.charAt(Math.floor(Math.random() * possible.length));
      return util.format('%s@bcs.%s', localPart, domainPart);
     
    },

     /*Generates random valid email for Client */
     randomClientEmail: function () {
      var localPart = "";
      var domainPart = "";
      var mainDomainPart = "";

      var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
      for (var i = 0; i < 5; i++)
        localPart += possible.charAt(Math.floor(Math.random() * possible.length));
      for (var i = 0; i < 2; i++)
        domainPart += possible.charAt(Math.floor(Math.random() * possible.length));
        for (var i = 0; i < 4; i++)
        mainDomainPart += possible.charAt(Math.floor(Math.random() * possible.length));
      return util.format('%s@%s.%s', localPart, mainDomainPart, domainPart);
     
    },

    /* выбирает случайно номер ответа для анкетирования 
    параметры
    answerCount - возможное количество ответов
    exludeAnswer - исключить такой номер в выборе. по умолчанию null*/
    randomAnswer: function (answerCount){
      var result = (Math.floor(Math.random() * answerCount) + 1);
     // result = (exludeAnswer == null ? rusult : 1);
      return result;
    },

    /* Сохраняет выбранный ответ Клиента в файл cleintQuestionary.json */
    saveClientAnswerToFile: function(questionNumber, answerNumber){
      var fs = require('fs');
      var fileName = './clientQuestionary.json';
      var file = require(fileName);
      switch(questionNumber)
      {
        case 1:
            file.Question_1.Answer = answerNumber;
            break;
        case 2:
            file.Question_2.Answer = answerNumber;
            break;
        case 3:
            file.Question_3.Answer = answerNumber;
            break;
        case 4:
            file.Question_4.Answer = answerNumber;
            break;
        case 5:
            file.Question_5.Answer = answerNumber;
            break;
        case 6:
            file.Question_6.Answer = answerNumber;
            break;
        case 7:
            file.Question_7.Answer = answerNumber;
            break;
        case 8:
            file.Question_8.Answer = answerNumber;
            break;
        case 9:
            file.Question_9.Answer = answerNumber;
            break;
        case 10:
            file.Question_10.Answer = answerNumber;
            break;
        case 11:
            file.Question_11.Answer = answerNumber;
            break;
        case 12:
            file.Question_12.Answer = answerNumber;
            break;
        break;

      }
      fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
      });
    },
    sleep :function(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }
  };
