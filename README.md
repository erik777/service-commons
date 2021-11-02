# Service Commons

Provides common building blocks for creating service infrastructure, including in servers and client APIs. 

This contains 

Injection: the implementation of Injection from the @angular/core project to help with service extensibility patterns. 
WebSockets: WebSocketClientService wraps a WebSocket with an rxjs Observer.

## WebSocketClientService

          this.subMessages = <Subject<MessageEvent>>this.wsService
            .create(url)
            .map((response: MessageEvent): any => {
              // We have to parse because message data is always text
              const data = JSON.parse(response.data);
              this.handleMessage(data);
              return data;
            });

## Notes

https://www.npmjs.com/package/ws

