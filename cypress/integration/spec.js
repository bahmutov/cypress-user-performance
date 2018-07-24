/// <reference types="cypress" />

it('loads TodoMVC app', () => {
  cy.visit('/')
  cy.get('#new-todo').should('be.visible')
})

it('loads TodoMVC app again', () => {
  cy.visit('/')
  cy.get('#new-todo').should('be.visible')
})
