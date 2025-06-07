import { HttpResponse } from 'msw';

export interface ErrorResponse {
	message: string;
	errors: string[];
	timestamp: string;
	correlationId: string;
}

export const badRequestResponseResolver: () => Promise<
	HttpResponse<ErrorResponse>
> = async () => {
	return HttpResponse.json(
		{
			message: 'Bad request',
			errors: [],
			timestamp: '',
			correlationId: '',
		},
		{ status: 400 },
	);
};
