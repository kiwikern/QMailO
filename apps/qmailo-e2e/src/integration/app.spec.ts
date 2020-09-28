import { getGreeting, getLogoutButton } from "../support/app.po";

describe('qmailo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display login screen', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('password');
    getLogoutButton().click();


    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Search field');
  });
});
