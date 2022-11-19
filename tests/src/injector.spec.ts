import { HTTP_CLIENT } from '../../lib/app-injector-tokens';
import { HttpClientI } from '../../lib/client/http/http-client-i';
import { DefaultInjector } from '../../lib/default-injector';
//import { InjectionToken, Injector } from '@angular/core';
import { InjectionToken, Injector } from '../../lib/angular/core';
import { StaticInjector } from '../../lib/angular/core/di/injector';
import { AxiosHttpClient } from '../../lib/client/http/axios-http-client';

interface TestI {
  value(): string;
}

class TestClass implements TestI {
  value() { return "hello" }
}

describe('create injector from', function() {
  it('a simple provider', function() {

    const TOKEN = new InjectionToken<TestI>('test implementation');
    const APP_INTERFACE_PROVIDERS = [
      // define here the HttpClientI implementation you want to use
      { provide: TOKEN, useClass: TestClass, deps: [] }
    ];

    const providers = [
      APP_INTERFACE_PROVIDERS
    ]

    const options = {providers: providers};
    const injector = Injector.create(options);
    expect(injector).toBeInstanceOf(StaticInjector);
  });
  
  it('injector instance', function() {
    const injector = DefaultInjector.getInstance();
    expect(injector).toBeInstanceOf(DefaultInjector);
    expect(injector.getInjector()).toBeInstanceOf(StaticInjector);
  });

  it('default injector', function() {
    const injector = DefaultInjector.getInstance().getInjector();
    expect(injector).toBeInstanceOf(StaticInjector);
    const httpClient: HttpClientI = injector.get(HTTP_CLIENT);
    expect(httpClient).toBeInstanceOf(AxiosHttpClient);
  });
});