/**
 * We only import the `TodoTrpcRouter` type from the server - this is not available at runtime
 */
import { DataTransformerOptions } from '@trpc/server';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TodoTrpcRouter } from '@todo/todo-app/domain/trpc-server';
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */

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
