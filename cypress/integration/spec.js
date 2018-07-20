/// <reference types="cypress" />

// marking events and then measuring how long
// loading the todo app takes
it('loads TodoMVC app', () => {
  cy.visit('/', {
    onBeforeLoad: (win) => {
      win.performance.mark('start')
    },
    onLoad: (win) => {
      win.performance.mark('end')
    }
  })
  cy.get('#new-todo').should('be.visible')
})

afterEach(() => {
  cy.window().its('performance')
    .then(performance => {
      performance.measure('load', 'start', 'end')
      const measure = performance.getEntriesByName('load', 'measure')[0]
      console.log(measure)
    })
})
