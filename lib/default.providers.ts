import { HTTP_CLIENT } from './app-injector-tokens';
import { AxiosHttpClient } from './client/http/axios-http-client';

export const APP_INTERFACE_PROVIDERS = [
  // define here the HttpClientI implementation you want to use
  { provide: HTTP_CLIENT, useClass: AxiosHttpClient, deps: [] }
];

export const providers = [
	APP_INTERFACE_PROVIDERS
]