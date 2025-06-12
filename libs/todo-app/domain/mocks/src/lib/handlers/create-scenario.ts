import { DefaultBodyType, HttpHandler, HttpResponseResolver } from 'msw';
import { PathParams } from 'msw';

export function createScenario<
	TParams extends PathParams<keyof TParams> = PathParams,
	TRequestBody extends DefaultBodyType = DefaultBodyType,
	TResponseBody extends DefaultBodyType = DefaultBodyType,
>(
	defaultHandler: HttpHandler,
	scenarioResolver: HttpResponseResolver<TParams, TRequestBody, TResponseBody>,
): HttpHandler {
	const { method, path } = defaultHandler.info;
	return new HttpHandler(method, path, scenarioResolver);
}
