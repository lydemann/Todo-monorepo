import { Injectable } from '@nestjs/common';
import faker from 'faker';

@Injectable()
export class AppService {
	public getData(): { message: string } {
		return { message: 'Welcome to todo-service' };
	}

	// get todolist with faked data
	public getTodoList(): any[] {
		const todoList = [];

		for (let index = 0; index < 5; index++) {
			const newTodo = {
				id: faker.random.uuid(),
				title: faker.random.words(2),
				description: faker.random.words(5),
			};

			todoList.push(newTodo);
		}
		return todoList;
	}
}
