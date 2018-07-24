/// <reference types="cypress" />

// get around https://github.com/cypress-io/cypress/issues/2196
// and start the mark using event callback
Cypress.on('window:before:load', (win) => {
  win.performance.mark('start')
})

// -- This is will overwrite an existing command --
Cypress.Commands.overwrite("visit", (originalVisit, url, options) => {
  const opts = Cypress._.merge(options, {
    onLoad: (win) => {
      win.performance.mark('end')
      win.performance.measure('load', 'start', 'end')
    }
  })
  return originalVisit(url, opts)
})

const measures = []

before(() => {
  measures.length = 0
})

after(() => {
  console.log('all %d measure(s)', measures.length)
  console.log(measures)
  // TODO send measures to Node land via cy.task or write into a file
  cy.writeFile('measures.json', JSON.stringify(measures, null, 2) + '\n')
})

afterEach(() => {
  cy.window().its('performance')
    .then(performance => {
      const measure = performance.getEntriesByName('load', 'measure')[0]
      console.log(measure)
      measures.push(measure)
    })
})
