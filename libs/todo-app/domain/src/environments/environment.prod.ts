// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

export const environment = {
	production: true,
	mock: false,
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
