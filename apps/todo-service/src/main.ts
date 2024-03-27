/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { environment } from './environments/environment';
import { trpcRouter } from '@todo/todo-app/domain/trpc-server';
import { renderTrpcPanel } from 'trpc-panel';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/api', trpcExpress.createExpressMiddleware({ router: trpcRouter }));

app.use('/panel', (_, res) => {
	return res.send(
		renderTrpcPanel(trpcRouter, {
			url: `http://localhost:${environment.port}/api`,
		}),
	);
});

const port = environment.port;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
	console.log(`Panel at http://localhost:${port}/panel`);
});
server.on('error', console.error);
