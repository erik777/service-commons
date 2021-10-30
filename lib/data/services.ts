export class Services {
    constructor( public services: Service[] ) {
    }
    
    public find( name: string ): Service {
        var result: Service;
        for (var svc of this.services) {
            if (svc.name == name) {
                result = svc;
                break;
            }
        }
        return result;
    }
    
    public lookup( serviceName: string, property: string, defaultValue: string ): string {
        let result = defaultValue;
        const service: Service = this.find( serviceName );
        if (service) {
            result = service[property] ? service[property] : defaultValue;
        }
        return result;
    }
}

export class Service {
    public name: string;
    public url: string;
}