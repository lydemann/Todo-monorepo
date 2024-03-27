import { TodoTrpcRouter } from '@todo/todo-app/domain/trpc-server';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */

// Initialize the tRPC client
export const trpc = createTRPCProxyClient<TodoTrpcRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3333/api',
		}),
	],
} as never);
