import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

// Routes are set up here
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('')
	public getData() {
		return this.appService.getData();
	}

	@Get('/todo-list')
	public getTodoList() {
		return this.appService.getTodoList();
	}
}
