import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	public getData() {
		return this.appService.getData();
	}

	@Post()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public postLog(data: any) {
		return this.appService.postLog(data);
	}
}
