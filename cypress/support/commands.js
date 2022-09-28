// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.on("uncaught:exception", (err, runnable, promise) => {
    // when the exception originated from an unhandled promise
    // rejection, the promise is provided as a third argument
    // you can turn off failing the test in this case
    if (promise) {
      return false;
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
  });

  Cypress.Commands.add('clearSessionStorage', () =>{
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  
  })

  Cypress.Commands.add("login", () => {
    Cypress.config("defaultCommandTimeout", 20000)
    cy.viewport(1920, 1080)
    cy.clearLocalStorage()
    cy.clearCookies();

    cy.visit('https://www.saucedemo.com/')
      .wait(2000)
    cy.get('input[data-test="username"]').type("standard_user", { log: false })
  
    cy.get('input[id="password"]').type("secret_sauce", { log: false })
  
    cy.get('input[value="Login"]').click()


  })