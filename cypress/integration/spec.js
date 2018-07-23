/// <reference types="cypress" />

it('loads TodoMVC app', () => {
  cy.visit('/')
  cy.get('#new-todo').should('be.visible')
})
