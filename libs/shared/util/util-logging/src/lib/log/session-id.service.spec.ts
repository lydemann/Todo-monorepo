import { SessionIdService } from './session-id.service';

describe('SessionIdService', () => {
	it('should generate session id', () => {
		const service = new SessionIdService();

		expect(service.sessionId).toBeUndefined();

		service.generateSessionId();
		expect(service.sessionId.length > 0).toBeTruthy();
	});
});
