import io from "socket.io-client";
import App from "../../../../App";
import { Server } from "net";

describe("UserViewEstimates", () => {
    let server: Server;
    let socket: (SocketIOClient.Socket | undefined);

    beforeAll((done) => {
        server = new App().SERVER.listen(global.__SIO_PORT__, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(() => {
            done();
        });
    });

    beforeEach(() => {
        socket = io(global.__SIO_URI__, { transports: ["websocket", "polling"] });
    });

    afterEach(() => {
        /**
         * This isn't like the real behaviour, we're closing client side but realistically,
         * the server would close it.
         */
        socket?.close();
        socket = undefined;
    });

    it("should expand successfully", (done) => {
        socket?.emit("join", { users_name: "testing", room: "test", estimate: "1" }, (data: string) => {
            expect(data).toBe("user-join-successful");
            socket?.emit("clickExpand", { isExpanded: true } , (d: string) => {
                expect(d).toBe("expand-update-successful");
                done();
            });
        });
    });

    it("should fail to expand successfully with incorrect data type", (done) => {
        socket?.emit("join", { users_name: "testing", room: "test", estimate: "1" }, (data: string) => {
            expect(data).toBe("user-join-successful");
            socket?.emit("clickExpand", "bob", (d: string) => {
                expect(d).toBe("expand-update-failed:incorrect-data-type");
                done();
            });
        });
    });

});
