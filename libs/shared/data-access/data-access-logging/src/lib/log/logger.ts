import moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { LogFields } from './log-data.interface';

export type LogType = 'Error' | 'Warning' | 'Information';

interface LogEntry {
	type: LogType;
	message: string;
	data: LogFields;
}

enum LoggerEvents {
	Flush = 1,
}

export class Logger {
	private readonly APP_FIELD = 'Application';
	private readonly ENV_FIELD = 'Environment';
	private readonly VERSION_FIELD = 'Version';
	private readonly USER_NAME_FIELD = 'UserName';
	private readonly ELAPSED_MS_FIELD = 'ElapsedMilliseconds';
	private readonly REQUEST_PATH_FIELD = 'RequestPath';
	private readonly URL_FIELD = 'Url';
	private readonly APP_STATE_FIELD = 'AppState';

	private buffer: LogEntry[] = [];
	private flush = new Subject<LoggerEvents>();

	constructor(
		private appName: string,
		private logEndpoint: string,
		private isProd = false,
	) {
		this.flush
			.pipe(
				debounceTime(5000),
				filter(event => event === LoggerEvents.Flush),
			)
			.subscribe(() => this.flushBuffer());
	}

	public log(type: LogType, message: string, data: LogFields) {
		this.buffer.push({
			type,
			message,
			data,
		});
		this.flush.next(LoggerEvents.Flush);
	}

	private flushBuffer() {
		const data = this.buffer.splice(0);

		if (data.length === 0) {
			return;
		}

		const body = data
			.map(entry => this.buildLogString(entry))
			.reduce((sum, entry) => (sum += entry), '');

		if (!this.isProd) {
			// This is nested to make sure we always end up in here when running locally
			// as in do not && this to the above if...
			// tslint:disable-next-line:no-console
			console.log({
				body,
				data,
			});
		} else {
			const xobj = new XMLHttpRequest();
			// tslint:disable-next-line:no-console
			xobj.onerror = err => console.error(err);
			xobj.open('POST', this.logEndpoint, true);
			xobj.send(body);
		}
	}

	private buildLogString(entry: LogEntry): string {
		const index = this.buildIndexChunk();
		const body = this.buildBodyChunk(entry);

		return `${index}\n${body}\n`;
	}

	private buildIndexChunk() {
		const date = moment();
		const index = {
			index: {
				_index: `logstash-${date.format('YYYY.M.D')}`,
				_type: 'logevent',
			},
		};

		return this.safeStringify(index);
	}

	private safeStringify(value) {
		const seen = new Set();
		return JSON.stringify(value, (k, v) => {
			if (seen.has(v)) {
				return '...';
			}
			if (typeof v === 'object') {
				seen.add(v);
			}
			return v;
		});
	}

	private buildBodyChunk(entry: LogEntry) {
		const { type, message, data } = entry;
		const level = type;
		const date = moment();
		const messageTemplate = this.getMessageTemplate();
		const fields = this.getFields(data);
		const body = {
			'@timestamp': `${date.toISOString()}`,
			level,
			messageTemplate,
			message,
			fields,
		};

		return body;
	}

	private getMessageTemplate() {
		const fields: string[] = [
			this.APP_FIELD,
			this.ENV_FIELD,
			this.VERSION_FIELD,
			this.USER_NAME_FIELD,
			this.ELAPSED_MS_FIELD,
			this.REQUEST_PATH_FIELD,
			this.URL_FIELD,
			this.APP_STATE_FIELD,
		];
		const template = fields.map(field => `{${field}}`).join(' - ');

		return template;
	}

	private getFields(data: LogFields) {
		return {
			[this.APP_FIELD]: this.appName,
			[this.ENV_FIELD]: data.environment,
			[this.VERSION_FIELD]: data.appVersion,
			[this.USER_NAME_FIELD]: data.userId,
			[this.ELAPSED_MS_FIELD]: data.elapsedTime,
			[this.REQUEST_PATH_FIELD]: data.requestPath,
			[this.URL_FIELD]: data.url,
			[this.APP_STATE_FIELD]: data.state,
		};
	}
}
