import { InjectionToken } from '@angular/core';

export interface ApiEndpoints {
	todoService: string;
	loggingService: string;
}

export const API_ENDPOINTS = new InjectionToken<ApiEndpoints>(
	'todo.shared.data-access.api-endpoints',
);
