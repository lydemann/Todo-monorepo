/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as StackTrace from 'stacktrace-js';

import { BrowserDetectorService } from '../browser-detector/browser-detector.service';
import { LogFields } from './log-data.interface';
import { Logger } from './logger';
import { SessionIdService } from './session-id.service';

@Injectable({
	providedIn: 'root',
})
export class LogService {
	private logger: Logger = {
		// tslint:disable-next-line: no-empty
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		log: () => {},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;
	private userId = '';
	private browserAndVendor = 'Unknown browser';
	private env = '';
	private logAsWarningSentences: string[] = [];

	constructor(
		private browserDetectorService: BrowserDetectorService,
		private sessionIdService: SessionIdService,
	) {
		this.browserAndVendor = this.browserDetectorService.getVendorAndVersion();
	}

	public initialize({
		appName,
		logUrl,
		env,
	}: {
		appName: string;
		logUrl: string;
		env: string;
	}) {
		this.env = env;
		this.logger = new Logger(appName, logUrl);
	}

	public logHttpInfo(info: any, elapsedTime: number, requestPath: string) {
		const url = location.href;

		const logFields: LogFields = {
			requestPath,
			elapsedTime,
			url,
			...this.getStandardLogFields(),
		};

		this.logger.log('Information', `${info}`, logFields);
	}

	public logHttpError(
		errorMsg: string,
		requestPath: string,
		correlationId: string,
	) {
		const url = location.href;

		const logFields: LogFields = {
			requestPath,
			url,
			correlationId,
			...this.getStandardLogFields(),
		};

		this.logger.log('Error', errorMsg, logFields);
	}

	public logErrorMsg(errorMsg: string) {
		const url = location.href;

		const logFields: LogFields = {
			requestPath: '',
			elapsedTime: 0,
			url,
			...this.getStandardLogFields(),
		};

		this.logger.log('Error', errorMsg, logFields);
	}

	public logError(error: any) {
		const message = error.message ? error.message : error.toString();
		if (error.status || !(error instanceof Error)) {
			error = new Error(message);
		}

		this.getStackTrace(error).then(stackString => {
			const errorTraceStr = `Error message:\n${message}.\nStack trace: ${stackString}`;

			// const isWarning = this.isWarning(errorTraceStr);

			// if (isWarning) {
			// 	this.logWarningMsg(errorTraceStr);
			// }
			this.logErrorMsg(errorTraceStr);
		});
	}

	public logWarningMsg(errorMsg: string) {
		const url = location.href;

		const logFields: LogFields = {
			requestPath: '',
			elapsedTime: 0,
			url,
			...this.getStandardLogFields(),
		};

		this.logger.log('Warning', errorMsg, logFields);
	}

	public logInfo(info: any) {
		const url = location.href;

		const logFields: LogFields = {
			requestPath: '',
			elapsedTime: 0,
			url,
			...this.getStandardLogFields(),
		};

		this.logger.log('Information', info, logFields);
	}

	public onUserChange(userId: string) {
		this.userId = userId;
	}

	private isWarning(errorTraceStr: string) {
		let isWarning = true;
		// Error comes from app
		if (errorTraceStr.includes('/src/app/')) {
			isWarning = false;
		}

		this.logAsWarningSentences.forEach(whiteListSentence => {
			if (errorTraceStr.includes(whiteListSentence)) {
				isWarning = true;
			}
		});

		return isWarning;
	}

	private getStackTrace(error: Error): Promise<any> {
		return StackTrace.fromError(error).then(stackframes => {
			// for getting stackTrace with sourcemaps
			const stackString = stackframes
				.splice(0, 10)
				.map(sf => {
					return sf.toString();
				})
				.toString();

			return stackString;
		});
	}

	private getStandardLogFields() {
		let state = {};
		state = {};

		return {
			environment: this.env,
			userId: this.userId,
			browser: this.browserAndVendor,
			sessionId: this.sessionIdService.sessionId,
			state,
		};
	}
}
