import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
/**
 * We only import the `TodoTrpcRouter` type from the server - this is not available at runtime
 */
import type { TodoTrpcRouter } from '@todo/todo-app/domain/trpc-server';
import { DataTransformerOptions } from '@trpc/server';

// Initialize the tRPC client
export const trpc = createTRPCProxyClient<TodoTrpcRouter>({
	links: [
		loggerLink(),
		httpBatchLink({
			url: 'http://localhost:3333/api',
		}),
	],
	transformer: {} as DataTransformerOptions,
});
