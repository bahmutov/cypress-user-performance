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

context('Editing', function () {
  // New commands used here:
  // - cy.blur    https://on.cypress.io/api/blur

  beforeEach(function () {
    cy.createDefaultTodos().as('todos')
  })

  it('should hide other controls when editing', function () {
    cy.get('@todos').eq(1).as('secondTodo')
    .find('label').dblclick()

    cy.get('@secondTodo').find('.toggle').should('not.be.visible')
    cy.get('@secondTodo').find('label').should('not.be.visible')

  })

  it('should save edits on blur', function () {
    cy.get('@todos').eq(1).as('secondTodo')
    .find('label').dblclick()

    cy.get('@secondTodo')
    .find('.edit').clear()
    .type('buy some sausages')
    // we can just send the blur event directly
    // to the input instead of having to click
    // on another button on the page. though you
    // could do that its just more mental work
    .blur()

    cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
    cy.get('@secondTodo').should('contain', 'buy some sausages')
    cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
  })

  it('should trim entered text', function () {
    cy.get('@todos').eq(1).as('secondTodo')
    .find('label').dblclick()

    cy.get('@secondTodo')
    .find('.edit').clear()
    .type('    buy some sausages    ').type('{enter}')

    cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
    cy.get('@secondTodo').should('contain', 'buy some sausages')
    cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
  })

  it('should remove the item if an empty text string was entered', function () {
    cy.get('@todos').eq(1).as('secondTodo')
    .find('label').dblclick()

    cy.get('@secondTodo')
    .find('.edit').clear().type('{enter}')

    cy.get('@todos').should('have.length', 2)
  })

  it('should cancel edits on escape', function () {
    cy.get('@todos').eq(1).as('secondTodo')
    .find('label').dblclick()

    cy.get('@secondTodo')
    .find('.edit').clear().type('foo{esc}')

    cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
    cy.get('@todos').eq(1).should('contain', TODO_ITEM_TWO)
    cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
  })
})
