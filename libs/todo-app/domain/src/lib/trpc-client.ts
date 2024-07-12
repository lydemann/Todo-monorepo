/**
 * We only import the `TodoTrpcRouter` type from the server - this is not available at runtime
 */
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { TodoTrpcRouter } from '@todo/todo-app/domain/trpc-server';
import { environment } from '../environments/environment';
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */

// Initialize the tRPC client
export const trpc = createTRPCProxyClient<TodoTrpcRouter>({
	links: [
		loggerLink(),
		httpBatchLink({
			url: `${environment.todoServiceUrl}/api`,
		}),
	],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
