import { InjectionToken } from './angular/core/di/injection_token';
//import { InjectionToken } from '@angular/core';
import { HttpClientI } from './client/http/http-client-i';

export const HTTP_CLIENT = new InjectionToken<HttpClientI>('http implementation');
