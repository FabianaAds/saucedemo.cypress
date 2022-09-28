/// <reference types="cypress"/>

import faker from "faker-br"; 
faker.locale = "pt_BR";




describe("make purchases on e-commerce", () => {
    beforeEach(() => {
        Cypress.config("defaultCommandTimeout", 20000)
        cy.viewport(1920, 1080)
        cy.clearCookies();
        cy.clearSessionStorage();
        cy.login()
          
  
    });

    
      it('make purchases', () => {
      
    //Sort products by value (low to high)
     cy.get('[id="header_container"]').contains("Products").should('be.visible')


     cy.get('select').select('Price (low to high)')
      
     //Add the following products to cart: Sauce Labs Onesie and Test.allTheThings() T-Shirt (Red)
      
     
    //Add Test.allTheThings() T-Shirt (Red)
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
      .click()

    //Add Sauce Labs Onesie
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]')
      .click()
    
    //clicking on cart
    cy.get('#shopping_cart_container')
      .click()
      .wait(2000)

    //validating if I'm on the correct page
    cy.contains("YOUR CART").should("be.visible")

    //clicking on checkout
    cy.get('[name="checkout"]')
      .click({force:true})


    //filling in first Name
    cy.get('input[id="first-name"]')
      .type(faker.name.firstName())


    //filling inLast Name
    cy.get('input[id="last-name"]')
      .type(faker.name.lastName())

    //filling in ZipCode
    cy.get('input[id="postal-code"]')
      .type("18150000")
        

    //clicking continue
    cy.get('input[id="continue"]')
      .click()

    //completing the purchase
    cy.get('#finish')
      .click()

    //clicking back to home
    cy.get('[data-test="back-to-products"]')
      .click()


    //log out
    cy.get('#react-burger-menu-btn')
      .click()
    cy.get('#logout_sidebar_link')   
      .click()

    }) 

})