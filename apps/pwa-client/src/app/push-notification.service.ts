import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

const SERVER_URL = 'http://localhost:3000/';
export const VAPID_PUBLIC =
	'BGzOM5-CkpxLsh5TMfKcuSaL16O-E0RHzRhR73buqCAsFIVUafXIw0X5gREW8gOeQXOXlgA7M59o38lL73NDW6o';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationService {
	constructor(
		private httpService: HttpClient,
		private swPush: SwPush,
	) {}

	requestSubscription() {
		return this.swPush
			.requestSubscription({
				serverPublicKey: VAPID_PUBLIC,
			})
			.then(subscription => {
				console.log('Subscription', subscription);
				//send subsription to server
				this.sendSubsriptionToService(subscription).subscribe();
			});
	}

	sendNotification() {
		return this.httpService.post(SERVER_URL + 'send-notification', {});
	}

	private sendSubsriptionToService(subscription: PushSubscription) {
		return this.httpService.post(SERVER_URL + 'subscription', subscription);
	}
}
