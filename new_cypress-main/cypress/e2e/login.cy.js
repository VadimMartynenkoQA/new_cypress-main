import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Автотесты для формы логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
           });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // Ввелверный логин
         cy.get(main_page.password).type(data.password); // Ввел верный пароль
         cy.get(main_page.login_button).click(); // Нажал на кнопку войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); // Текст есть и виден пользователю
         

     })

     it('Проверка восстановления пароля', function () {
        cy.get(main_page.forgot_pass_btn).click(); // Нажимаю кнопку "забыли пароль"

        cy.get(recovery_page.email).type(data.login); // Ввёл почту для восстановления
        cy.get(recovery_page.send_button).click(); // Нажимаю отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
        cy.get(result_page.title).should('be.visible'); // Текст есть и виден пользователю
      

    })

     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Нашёл поле логин и ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Нашёл поле пароль и ввели неверный пароль
        cy.get(main_page.login_button).click(); // Нашёл кнопку Войти и нажали на неё

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст есть и виден пользователю
      

    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Нашёл поле логин и ввел неверный логин
        cy.get(main_page.password).type(data.password); // Нашёл поле пароль и ввел верный пароль
        cy.get(main_page.login_button).click(); // Нашёл кнопку Войти и нажал на неё

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст есть и виден пользователю
   

    })

    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввел логин без собачки
        cy.get(main_page.password).type('iLoveqastudio1'); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нашёл кнопку Войти и нажали на неё

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст есть и виден пользователю


    })
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome
 
