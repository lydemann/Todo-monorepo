import { Injectable } from '@angular/core';

import { createGuid } from './guid-helper';

@Injectable({
	providedIn: 'root',
})
export class SessionIdService {
	public sessionId;

	public generateSessionId() {
		this.sessionId = createGuid();
	}
}
