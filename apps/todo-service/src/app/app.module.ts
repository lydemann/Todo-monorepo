import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Bootstrapping the service
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, 'assets'),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
