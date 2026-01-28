// TODO: change the key of returning content to the one your api returns

type TApiPaths = import('./schema').paths

type TPathKeys = keyof TApiPaths

type TPathMethods<Path extends TPathKeys> = keyof TApiPaths[Path]

type TResponse<Path extends TPathKeys, Method extends TPathMethods<Path>> = TApiPaths[Path][Method]['responses']['200']['content']['application/json; v=1.0']

type TRequestParameters<Path extends TPathKeys, Method extends TPathMethods<Path>> = TApiPaths[Path][Method]['parameters']['path']

type TRequestQuery<Path extends TPathKeys, Method extends TPathMethods<Path>> = TApiPaths[Path][Method]['parameters']['query']

type TRequestBody<Path extends TPathKeys, Method extends TPathMethods<Path>> = Required<TApiPaths[Path][Method]>['requestBody']['content']['application/json; v=1.0']
