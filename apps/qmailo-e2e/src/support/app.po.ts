export const getFileList = () => cy.get('app-files-list');

export const getPassword = () => cy.get('input[name="password"]');

export const getLoginButton = () => cy.get('button[type="submit"]');

export const getLogoutButton = () => cy.get('button:contains("exit_to_app")');

export const getOpenFileDialogButton = () => cy.get('button:contains("add")');

export const getNameInput = () => cy.get('input[data-placeholder="Name"]');
export const getContentInput = () =>
  cy.get('textarea[data-placeholder="Content"]');
export const getAddFileButton = () => cy.get('button:contains("Add")');

export const getFileRow = (fileName: string, content: string) =>
  cy.get(`mat-row:contains("${fileName}${content}")`);
export const getDeleteFileButton = () => cy.get('button:contains("delete")');
export const getConfirmDeletionButton = () =>
  cy.get('button:contains("Delete file")');
export const getActiveSnackbar = () => cy.get('simple-snack-bar');
