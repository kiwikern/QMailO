/// <reference path="../support/index.d.ts" />

import { getActiveSnackbar, getFileList, getLogoutButton } from "../support/app.po";

describe('qmailo', () => {
  beforeEach(() => cy.visit('/'));

  it('should login and logout', () => {
    cy.login('password');

    getFileList().contains('Search field');

    getLogoutButton().click();
  });

  it('should create a file and delete it', () => {
    cy.login('password');
    cy.addFile('hello', 'mail@example.com')
    cy.deleteFile('hello', 'mail@example.com')
    getActiveSnackbar().contains('File was successfully deleted')
  });
});
