import io from "socket.io-client";
import App from "../../../../App";
import { Server } from "net";

describe("UserSendEstimate", () => {
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

    it("should update the estimates successfully", (done) => {
        socket?.emit("join", { users_name: "testing", room: "test", estimate: "1" }, (data: string) => {
            expect(data).toBe("user-join-successful");
            socket?.emit("sendEstimate", 100, (d: string) => {
                expect(d).toBe("estimates-update-successful");
                done();
            });
        });
    });

    it("should fail to update the estimates, with an out of range error", (done) => {
        socket?.emit("join", { users_name: "testing", room: "test", estimate: "1" }, (data: string) => {
            expect(data).toBe("user-join-successful");
            socket?.emit("sendEstimate", 101, (d: string) => {
                expect(d).toBe("estimates-update-failed:number-out-of-range");
                done();
            });
        });
    });

    it("should fail to update the estimates, with an incompatable data type error", (done) => {
        socket?.emit("join", { users_name: "testing", room: "test", estimate: "1" }, (data: string) => {
            expect(data).toBe("user-join-successful");
            socket?.emit("sendEstimate", "d", (d: string) => {
                expect(d).toBe("estimates-update-failed:incorrect-data-type");
                done();
            });
        });
    });

});
