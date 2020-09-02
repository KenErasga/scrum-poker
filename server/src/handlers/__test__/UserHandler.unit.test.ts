import io from "socket.io-client";

describe("UserHandler", () => {
    //let socket: SocketIOClient.Socket;

    beforeAll((done) => {
        //socket = io("ENDPOINT", { transports: ["websocket", "polling"] });
        done();
    });

    it("should have max value of 100", () => {
        expect(global.__SIO_URI__).toBe("bob");
    });
});
