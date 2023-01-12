export interface LogFields {
	userId: string;
	elapsedTime?: number;
	requestPath?: string;
	environment?: string;
	appVersion?: string;
	url?: string;
	correlationId?: string;
	sessionId?: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	state?: {};
}
