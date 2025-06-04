import { HttpResponse } from 'msw';

export const badRequestResponseResolver: () => Promise<HttpResponse> =
	async () => {
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
