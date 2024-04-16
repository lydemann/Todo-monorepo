import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import webpush from 'web-push';

const app = express();

const vapidKeys = {
	publicKey:
		'BGzOM5-CkpxLsh5TMfKcuSaL16O-E0RHzRhR73buqCAsFIVUafXIw0X5gREW8gOeQXOXlgA7M59o38lL73NDW6o',
	privateKey: 'fnXDm1-sNIxo7ANOzLVHayVTEvKWscgJM-Y41AO3jdo',
};

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails(
	'mailto:christian@christianlydemann.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey,
);
const inmemoryDB = [] as PushSubscription[];

app.post('/subscription', (req, res) => {
	const subscription = req.body as PushSubscription;
	console.log(subscription);

	if (inmemoryDB.some(sub => sub.endpoint === subscription.endpoint)) {
		return res.status(200).json({ message: 'Subscription already exists' });
	}

	inmemoryDB.push(subscription);
	return res.status(200).json({ message: 'Subscription added successfully' });
});

app.post('/send-notification', (req, res) => {
	const notificationPayload = {
		notification: {
			title: 'New Notification!',
			body: 'This is the body of the notification',
			icon: 'assets/icons/icon-512x512.png',
			actions: [
				{ action: 'focus', title: 'Focus last' },
				{ action: 'nav', title: 'Navigate last' },
				{ action: 'req', title: 'Send request in the background' },
			],
			data: {
				onActionClick: {
					// default when clicking
					default: { operation: 'openWindow' },
					// focus in existing or open new at url
					focus: { operation: 'focusLastFocusedOrOpen', url: 'relative/path' },
					// navigate in existing or open at url
					nav: {
						operation: 'navigateLastFocusedOrOpen',
						url: 'https://other.domain.com/',
					},
					// send request in the background
					req: {
						operation: 'sendRequest',
						url: 'https://yet.another.domain.com/',
					},
				},
			},
		},
	};

	const promises: PushSubscription[] = [];
	inmemoryDB.forEach(subscription => {
		promises.push(
			webpush.sendNotification(
				subscription,
				JSON.stringify(notificationPayload),
			),
		);
	});
	Promise.all(promises).then(() =>
		res.status(200).json({ message: 'Pushed successfully' }),
	);
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
