import { throwError } from "rxjs";

export abstract class HttpServices {
	log(message: string): void {
		console.debug('HttpServices:' + message);
  }
  
  public errorHasContents (error: any): boolean {
    return error.status && error.status === 200 && error.error && error.error.text;
  }

	/**
	 * Attempts to parse the resulting error to create a more presentable one.  
	 * If it cannot parse it, it will simply return "Server error "
	 * followed by the passed reference.
	 * 
	 * @param error 
	 * @param reference 
	 */
	protected handeError(error: any, reference?: string) {
		if (!reference) reference = 'UNKNOWN';
		console.error('ERROR: Response for  ' + reference + ' is ' + error + ', JSON: ' + JSON.stringify(error));
		// console.error('ERROR: Response for  ' + jsonRef + ' is ' + JSON.stringify(error));
		// console.warn('res.url: ' + res.url);

    // console.error('handleObservableError: ' + JSON.stringify(error)); // log to console instead
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error ' + reference;
    console.error('errMsg: ' + errMsg);

    return throwError(() => new Error(errMsg));
	}

	protected extractJson(res: any): any {
		// axios returns result in 'data'.  you'll get circular error parsing JSON if
		// you try to parse it first. 
		if (res.data) res = res.data;
		return res;
	}

}