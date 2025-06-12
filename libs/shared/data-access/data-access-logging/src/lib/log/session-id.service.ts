import { Injectable } from '@angular/core';

import { createGuid } from './guid-helper';

@Injectable({
	providedIn: 'root',
})
export class SessionIdService {
	public sessionId: string | undefined;

	public generateSessionId() {
		this.sessionId = createGuid();
	}
}
