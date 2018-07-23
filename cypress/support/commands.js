/// <reference types="cypress" />

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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//


// get around https://github.com/cypress-io/cypress/issues/2196
// and start the mark using event callback
Cypress.on('window:before:load', (win) => {
  win.performance.mark('start')
})

// -- This is will overwrite an existing command --
Cypress.Commands.overwrite("visit", (originalVisit, url, options) => {
  const opts = Cypress._.merge(options, {
    onLoad: (win) => {
      console.log('onLoad')
      win.performance.mark('end')
      win.performance.measure('load', 'start', 'end')
    }
  })
  return originalVisit(url, opts)
})

afterEach(() => {
  cy.window().its('performance')
    .then(performance => {
      // performance.measure('load', 'start', 'end')
      const measure = performance.getEntriesByName('load', 'measure')[0]
      console.log(measure)
    })
})
