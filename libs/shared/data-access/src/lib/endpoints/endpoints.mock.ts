import { API_ENDPOINTS } from './endpoints.config';
import { EndpointsService } from './endpoints.service';

export const getEndpointMock = () => [
	EndpointsService,
	{
		provide: API_ENDPOINTS,
		useValue: {
			todoService: 'https://todoservice',
			loggingService: 'https://loggingservice',
		},
	},
];
