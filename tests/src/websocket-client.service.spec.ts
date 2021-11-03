import { WebSocketClientService, WebSocketEnvironment } from "../../lib/service/websocket-client.service"

describe("WebSocketClientService", () => {
  it("has correct environment", () => {
    let webEnv = new WebSocketClientService();
    expect(webEnv.isInBrower()).toBeTrue();
    webEnv = new WebSocketClientService(WebSocketEnvironment.Node);
    expect(webEnv.isInBrower()).toBeFalse();
  })
})