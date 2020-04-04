// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
	namespace Cypress {
		interface Chainable {
			setupAppGlobalRoutes: () => void;
		}
	}
}

export const setupAppGlobalRoutes = () => {
	cy.server();
	cy.route('/api/todo-list', 'fixture:todo-list.json');
	cy.route('/i18n/en-lang.json', 'fixture:en-lang.json');
};
Cypress.Commands.add('setupAppGlobalRoutes', setupAppGlobalRoutes);
