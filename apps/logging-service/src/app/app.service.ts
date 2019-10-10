import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	public postLog(data: any) {
		// tslint:disable-next-line: no-console
		console.log(JSON.stringify(data));
	}
	public getData(): { message: string } {
		return { message: 'Welcome to logging-service!' };
	}
}
