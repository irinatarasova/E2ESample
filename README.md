
this e2e test (user acions emulation)

files:

locators.json 
= contains all web-elements locators. Very handy to keep all in one place;
= also contains all messages and text properties for web-elements in Eng and Rus languages (as application is bilingual)

page-objects folder 
= contains page classes for each page

config.properties
= config file; contains app url
= contains some test data (should be kept in another file)

testscript.js
= test script with user flow actions

helpes folder
= /helpers/utils.js contains helper methods
= /helpers/clientQuestionary.json is a template for Questinary


to run test
1. cd /AutoTest/
2. npm install
3. testcafe install http://devexpress.github.io/testcafe/documentation/using-testcafe/installing-testcafe.html
4. to run test cd /AutoTest/
testcafe firefox testscript.js
