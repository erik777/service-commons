import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/**
 * Standard interface for http clients so you can use them in a pluggable way. 
 * This allows you to choose one based on the environment, such as a Node 
 * back-end vs an Angular UI, while sharing the same code base between them
 * that consumes an http client.  
 */
export interface HttpClientI {
  get( url: string, options?: HttpOptions ): Observable<any>;
	post(url: string, data: any, options?: HttpOptions) 
		: Observable<any>;
	put(url: string, data: any, options?: HttpOptions) 
		: Observable<any>;
	delete(url: string, options?: HttpOptions) 
		: Observable<any>;
}

export class HttpOptions { 
	headers?: Map<string, string>;
	observe?: 'body'; 
	params?: Map<string, string>;
	reportProgress?: boolean;
	responseType?: 'json' | 'text';
	withCredentials?: boolean; 
};

