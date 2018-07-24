/// <reference types="cypress" />

// setup these constants to match what TodoMVC does
let TODO_ITEM_ONE = 'buy some cheese'
let TODO_ITEM_TWO = 'feed the cat'
let TODO_ITEM_THREE = 'book a doctors appointment'

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

context('New Todo', function () {
  // New commands used here:
  // https://on.cypress.io/type
  // https://on.cypress.io/eq
  // https://on.cypress.io/find
  // https://on.cypress.io/contains
  // https://on.cypress.io/should
  // https://on.cypress.io/as

  it('should allow me to add todo items', function () {
    // create 1st todo
    cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')

    // make sure the 1st label contains the 1st todo text
    cy.get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)

    // create 2nd todo
    cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')

    // make sure the 2nd label contains the 2nd todo text
    cy.get('.todo-list li').eq(1).find('label').should('contain', TODO_ITEM_TWO)
  })

  it('should clear text input field when an item is added', function () {
    cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')
    cy.get('.new-todo').should('have.text', '')
  })

  it('should append new items to the bottom of the list', function () {
    // this is an example of a custom command
    // which is stored in tests/_support/spec_helper.js
    // you should open up the spec_helper and look at
    // the comments!
    cy.createDefaultTodos().as('todos')

    // even though the text content is split across
    // multiple <span> and <strong> elements
    // `cy.contains` can verify this correctly
    cy.get('.todo-count').contains('3 items left')

    cy.get('@todos').eq(0).find('label').should('contain', TODO_ITEM_ONE)
    cy.get('@todos').eq(1).find('label').should('contain', TODO_ITEM_TWO)
    cy.get('@todos').eq(2).find('label').should('contain', TODO_ITEM_THREE)
  })

  it('should trim text input', function () {
    // this is an example of another custom command
    // since we repeat the todo creation over and over
    // again. It's up to you to decide when to abstract
    // repetitive behavior and roll that up into a custom
    // command vs explicitly writing the code.
    cy.createTodo(`    ${TODO_ITEM_ONE}    `)

    // we use as explicit assertion here about the text instead of
    // using 'contain' so we can specify the exact text of the element
    // does not have any whitespace around it
    cy.get('.todo-list li').eq(0).should('have.text', TODO_ITEM_ONE)
  })

  it('should show #main and #footer when items added', function () {
    cy.createTodo(TODO_ITEM_ONE)
    cy.get('.main').should('be.visible')
    cy.get('.footer').should('be.visible')
  })
})
