import { Observable, from } from 'rxjs';
import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { HttpClientI, HttpOptions } from './http-client-i';
import { Utilities } from '../../Utilities';

export class AxiosHttpClient implements HttpClientI {
	axios: AxiosInstance = Axios.create( /* can add confic params here such as timeout 
		baseURL or headers */ );

	private toAxiosOptions(options: HttpOptions): AxiosRequestConfig {
		let axiosOptions: AxiosRequestConfig = {};
		if (options.headers)
//      axiosOptions.headers = options.headers;
      axiosOptions.headers = Utilities.mapToRecord(options.headers);
		if (options.params)
			axiosOptions.params = Utilities.mapToObject(options.params);
		if (options.responseType) axiosOptions.responseType = options.responseType;
		if (options.withCredentials) axiosOptions.withCredentials = options.withCredentials;
		return axiosOptions;
	}

    private newMethod(axiosOptions: AxiosRequestConfig<any>) {
        return axiosOptions.headers;
    }

	/**
	 * Does an HTTP GET.  
	 * 
	 * Axios does not support the observe or reportProgress options.  
	 * Need to test using 'json' or 'text' with Axios versus the longer responseType. 
	 * 
	 * @param url 
	 * @param options 
	 */
  get(url: string,
      options?: HttpOptions
		): Observable<any>
  {
		let result: Promise<AxiosResponse<any>>;
		if (options) {
			const axiosOptions = this.toAxiosOptions(options);
			result = this.axios(url, axiosOptions);
		} else {
			result = this.axios(url);
		}
		const observable = from(result);
		return observable;
	}
	
	post(url: string, data: any, options?: HttpOptions) 
		: Observable<any>
	{
		let result: Promise<AxiosResponse<any>>;
		if (options) {
			const axiosOptions = this.toAxiosOptions(options);
			this.axios.post(url, data, axiosOptions);
		} else {
			this.axios.post(url, data);
		}
		return from(result);
	}

	put(url: string, data: any, options?: HttpOptions) 
		: Observable<any>
	{
		let result: Promise<AxiosResponse<any>>;
		if (options) {
			const axiosOptions = this.toAxiosOptions(options);
			this.axios.put(url, data, axiosOptions);
		} else {
			this.axios.put(url, data);
		}
		return from(result);
	}

	delete(url: string, options?: HttpOptions) 
		: Observable<any>
	{
		let result: Promise<AxiosResponse<any>>;
		if (options) {
			const axiosOptions = this.toAxiosOptions(options);
			this.axios.delete(url, axiosOptions);
		} else {
			this.axios.delete(url);
		}
		return from(result);
	}
}