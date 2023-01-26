declare let window: any;

export const environment = {
	production: true,
	get environment() {
		return window.config.environment || '';
	},

	get todoServiceUrl() {
		return window.config?.todoServiceUrl || '';
	},

	get loggingServiceUrl() {
		return window.config?.loggingServiceUrl || '';
	},
};
