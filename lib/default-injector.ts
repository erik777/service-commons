import { providers } from "./default.providers";
//import { Injector } from "@angular/core";
import { Injector } from "./angular/core/di/injector";

export class DefaultInjector {
	static instance: DefaultInjector;
	
	private injector: Injector;

	static getInstance() {
		if (!DefaultInjector.instance) DefaultInjector.instance = new DefaultInjector();
		return DefaultInjector.instance;
	}

	getInjector() {
//    if (!this.injector) this.injector = ReflectiveInjector.resolveAndCreate(providers);
    const options = {providers: providers};
    if (!this.injector) this.injector = Injector.create(options);
		return this.injector;
	}

	static get(token: any): any {
		 return DefaultInjector.getInstance().getInjector().get(token);
	}
}