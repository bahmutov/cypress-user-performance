/// <reference types="cypress" />

// setup these constants to match what TodoMVC does
const TODO_ITEM_ONE = 'buy some cheese'
const TODO_ITEM_TWO = 'feed the cat'
const TODO_ITEM_THREE = 'book a doctors appointment'

beforeEach(function () {
  // By default Cypress will automatically
  // clear the Local Storage prior to each
  // test which ensures no todos carry over
  // between tests.
  //
  // Go out and visit our local web server
  // before each test, which serves us the
  // TodoMVC App we want to test against
  //
  // We've set our baseUrl to be http://localhost:8888
  // which is automatically prepended to cy.visit
  //
  // https://on.cypress.io/api/visit
  cy.visit('/')
})

context('Clear completed button', function () {
  beforeEach(function () {
    cy.createDefaultTodos().as('todos')
  })

  it('should display the correct text', function () {
    cy.get('@todos').eq(0).find('.toggle').check()
    cy.get('.clear-completed').contains('Clear completed')
  })

  it('should remove completed items when clicked', function () {
    cy.get('@todos').eq(1).find('.toggle').check()
    cy.get('.clear-completed').click()
    cy.get('@todos').should('have.length', 2)
    cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
    cy.get('@todos').eq(1).should('contain', TODO_ITEM_THREE)
  })

  it('should be hidden when there are no items that are completed', function () {
    cy.get('@todos').eq(1).find('.toggle').check()
    cy.get('.clear-completed').should('be.visible').click()
    cy.get('.clear-completed').should('not.exist')
  })
})
