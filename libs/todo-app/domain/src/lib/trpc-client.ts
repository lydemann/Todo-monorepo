/**
 * We only import the `TodoTrpcRouter` type from the server - this is not available at runtime
 */
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
			fetch: fetch,
		}),
	],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
