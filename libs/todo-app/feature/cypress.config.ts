import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
	component: {
		...nxComponentTestingPreset(__filename),
		devServerPublicPathRoute: '',
		// Please ensure you use `cy.origin()` when navigating between domains and remove this option.
		// See https://docs.cypress.io/app/references/migration-guide#Changes-to-cyorigin
		injectDocumentDomain: true,
	},
	includeShadowDom: true,
});
