/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    login(password: string): Chainable<Element>
    addFile(fileName: string, content: string): Chainable<Element>
    deleteFile(fileName: string, content: string): Chainable<Element>
  }
}
