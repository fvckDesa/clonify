/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    getByCy(dataCy: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("getByCy", (dataCy) => {
  return cy.get(`[data-cy=${dataCy}]`);
});
