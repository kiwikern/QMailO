export const getGreeting = () => cy.get('app-files-list');

export const getPassword = () => cy.get('input[name="password"]')

export const getLoginButton = () => cy.get('button[type="submit"]')

export const getLogoutButton = () => cy.get('button:contains("exit_to_app")')
