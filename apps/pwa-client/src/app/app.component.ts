import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PushNotificationService } from './push-notification.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { SharedUiModule } from '@todo-app/ui';

@Component({
	imports: [RouterModule, SharedUiModule],
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
		swUpdate: SwUpdate,
	) {
		if (swUpdate.isEnabled) {
			// check for updates every 6 hours
			setInterval(
				() => {
					swUpdate.checkForUpdate();
				},
				6 * 60 * 60 * 1000,
			);

			// if a new version is available, ask the user to load it
			swUpdate.versionUpdates.subscribe(versionEvent => {
				if (versionEvent.type === 'VERSION_READY') {
					if (confirm('New version available. Load New Version?')) {
						window.location.reload();
					}
				}
			});
		}

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

		pushNotification.requestSubscription();
	}

	sendNotification() {
		this.pushNotification.sendNotification().subscribe();
	}
}
