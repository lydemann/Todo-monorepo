import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	PushNotificationService,
	VAPID_PUBLIC,
} from './push-notification.service';
import { SwPush } from '@angular/service-worker';

@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'app-root',
	template: `<h1>Welcome pwa-client</h1>
		<button (click)="sendNotification()">Send Notification</button>`,
	styles: ``,
})
export class AppComponent {
	/**
	 * Thorugh dependecy injection we provide our app component the SwPush service to interact with Push Api.
	 * @param swPush Service provided by the angular service worker module. It is required for pushing notifications
	 */
	constructor(
		swPush: SwPush,
		private pushNotification: PushNotificationService,
	) {
		//check if the browser supports service workers
		if (!swPush.isEnabled) {
			console.log('Service worker is not enabled');
			return;
		}

		swPush.notificationClicks.subscribe(({ action, notification }) => {
			console.log('Notication click', action, notification);
		});

		swPush.messages.subscribe(message => {
			console.log('Push message', message);
		});

		swPush
			.requestSubscription({
				serverPublicKey: VAPID_PUBLIC,
			})
			.then(subscription => {
				//send subsription to server
				this.pushNotification
					.SendSubsriptionToService(subscription)
					.subscribe();
			})
			.catch(console.error);
	}

	sendNotification() {
		this.pushNotification.sendNotification().subscribe();
	}
}
