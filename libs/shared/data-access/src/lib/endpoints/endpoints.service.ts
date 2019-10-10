import { Inject, Injectable } from '@angular/core';

import { API_ENDPOINTS, ApiEndpoints } from './endpoints.config';

@Injectable({
	providedIn: 'root',
})
export class EndpointsService {
	public get todoService(): string {
		return `${this.endpoints.todoService}`;
	}

	public get loggingService(): string {
		return `${this.endpoints.loggingService}`;
	}

	private endpoints: ApiEndpoints;

	constructor(@Inject(API_ENDPOINTS) endpoints: ApiEndpoints) {
		this.endpoints = Object.keys(endpoints).reduce(
			(ep, key) => {
				return { ...ep, [key]: this.removeTrailingSlash(endpoints[key]) };
			},
			{} as ApiEndpoints,
		);
	}

	private removeTrailingSlash(str: string): string {
		return str.replace(/\/$/, '');
	}
}
