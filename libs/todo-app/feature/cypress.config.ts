import { defineConfig } from 'cypress';
import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';

export default defineConfig({
	component: {
		...nxComponentTestingPreset(__filename),
		devServerPublicPathRoute: '',
	},
	includeShadowDom: true,
});
