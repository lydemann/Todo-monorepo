import {
	createHttpFactory,
	HttpMethod,
	mockProvider,
	SpectatorHttp,
} from '@ngneat/spectator/jest';

import { EndpointsService } from '@todo/shared/data-access';
import { TodoListResourcesService } from './todo-list-resources.service';

describe('TodoListResourcesService', () => {
	let spectator: SpectatorHttp<TodoListResourcesService>;
	const createHttp = createHttpFactory({
		service: TodoListResourcesService,
		providers: [
			mockProvider(EndpointsService, { todoService: 'todo-service-url' }),
		],
	});

	beforeEach(() => (spectator = createHttp()));

	describe('getTodos', () => {
		it('should call GET todos', () => {
			spectator.service.getTodos().subscribe();
			spectator.expectOne('todo-service-url/api/todo-list', HttpMethod.GET);
		});
	});
});
