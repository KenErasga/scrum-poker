import io from "socket.io-client";
import App from "../../../../App";
import { Server } from "net";

describe("UserDisconnect", () => {
    let server: Server;
    let socket: (SocketIOClient.Socket | undefined);

    beforeAll((done) => {
        server = new App().SERVER.listen(global.__SIO_PORT__, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close((err) => {
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

    it("should disconnect successfully", (done) => {
        ([
            async () => {
                socket?.emit("join", { users_name: "testing", room: "test", estimate: "1" }, (data: string) => {
                    expect(data).toBe("user-join-successful");
                    socket?.emit("disconnect");
                    socket?.close();
                });
            },

            async () => {
                socket?.on("disconnect", () => {
                    expect(socket?.connected).toBe(false);
                });
            }
        ].reduce((initialProm, nextProm) => {
                return initialProm.then(nextProm);
        }, Promise.resolve().then(() => done())));

    });

});



