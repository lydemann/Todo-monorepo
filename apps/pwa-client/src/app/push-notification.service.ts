import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SERVER_URL = 'http://localhost:3000/';
export const VAPID_PUBLIC =
	'BGzOM5-CkpxLsh5TMfKcuSaL16O-E0RHzRhR73buqCAsFIVUafXIw0X5gREW8gOeQXOXlgA7M59o38lL73NDW6o';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationService {
	sendNotification() {
		return this.httpService.post(SERVER_URL + 'send-notification', {});
	}
	constructor(private httpService: HttpClient) {}

	SendSubsriptionToService(subscription: PushSubscription) {
		return this.httpService.post(SERVER_URL + 'subscription', subscription);
	}
}
