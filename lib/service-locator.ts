import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { map, catchError } from 'rxjs/operators';

import { Services } from './data/services';
import { Environment } from './data/environment';
import { HttpClientI } from './client/http/http-client-i';
import { HttpServices } from './http-services';

/**
 * In order to make this re-usable in different modules, Environment is 
 * implemented by the module importing it.  This allows the source/location
 * of the Environment to be controlled by the application.
 */
export abstract class ServiceLocator<H extends HttpClientI> extends HttpServices {
	private services: Services;

	abstract getEnvironment(): Environment;

	constructor(protected http: H) {
		super();
		this.log('constructor called');
		this.refreshServices();
	}

	log(message: string): void {
		console.debug('ServiceLocator:' + message);
	}

	// create simple observable that just returns the value
	private servicesObservable = new Observable<Services>((observer) => {
		this.log('servicesObservable(): next ' + JSON.stringify(this.services));
		observer.next(this.services);
		observer.complete();
	});

	getServicesObservable(): Observable<Services> {
		const methodName = 'getServicesObservable';
		if (this.services) {
			this.log(methodName + ': using this.services');
			return this.servicesObservable;
		} else {
			this.log(methodName + ': calling this.queryServices');
			return this.queryServices(this.getEnvironment().serviceJsonUrl);
		}
	}

	private queryServices(jsonRef: string): Observable<Services> {
		this.log('queryServices: Reading ' + jsonRef);
		return this.http.get(jsonRef)
//      .map(this.extractJson)
      .pipe(
        map(this.extractJson),
        catchError(err => this.handeError(err, jsonRef))
      )
//			.catch(err => this.handeError(err, jsonRef));
	}

	private refreshServices() {
		// this.log('refreshServices(): querying ' + this.getEnvironment().serviceJsonUrl);
		this.queryServices(this.getEnvironment().serviceJsonUrl).subscribe(
			// data => this.setServices(data.services),
			data => { 
				// this.log('refreshServices(): data: ' + JSON.stringify(data));
				this.services = data; 
			},
			error => console.error('refreshServices ERROR: ' + error))
			.unsubscribe();
	}

	protected extractJson(res: any): Services {
		// axios returns result in 'data'.  you'll get circular error parsing JSON if
		// you try to parse it first. 
		// if (res.data) res = res.data;
		res = super.extractJson(res);

		// Convert to Services object
		if (res.services) {
			return new Services(res.services);
		} else {
			return new Services([]);
		}
	}	
}
