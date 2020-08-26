import express, { Express } from "express";
import socketio, { Socket } from "socket.io";
import http, { Server } from "http";
import routes from "./routes";
import IUser from "./interfaces/IUser";
import UserHandler from "./handlers/UserHandler";
import User from "./dto/User.dto";
import sioEvents from "./socketio-events/scrum-poker/events";

/**
 * Server entry point
 *
 * @class
 * @author ale8k, KenErasga
 */
class Index {
    /**
     * @property {number} _PORT : The port to run the server on
     */
    private static readonly _PORT: number = parseInt(process.env.PORT as string) || 3001;
    /**
     * @property {Express} _APP : Express app instance, note, we're only using this for the RequestListeners
     * -- We technically don't need it...
     */
    private static readonly _APP: Express = express();
    /**
     * @property {Server} _SERVER : Generic HTTP module server
     */
    private static readonly _SERVER: Server = http.createServer(Index._APP);
    /**
     * @property {socketio.Server} IO : The socketio websocket instance
     */
    public readonly IO: socketio.Server = socketio(Index._SERVER);

    constructor() {
        this.registerHTTPRoutes();
        this.registerSocketIOEvents(this.IO);
        Index._SERVER.listen(Index._PORT, () => console.log(`Server running on: ${Index._PORT}`));
    }

    /**
     * Registers all routes {RequestHandler/express.Router} within the Express app instance
     */
    private registerHTTPRoutes(): void {
        routes.forEach(route => Index._APP.use(new route().ROUTER));
    }

    /**
     * Registers all socket.io events
     * Takes the array import and reduces through each event object passing it
     * into this given users socket
     *
     * @param {socketio.Server} io : Our socketio server instance
     */
    private registerSocketIOEvents(io: socketio.Server): void {
        io.on("connection", (socket: Socket) => {
            console.log("Client connection made.");

            sioEvents.reduce((sock, acc) => {
                const e = new acc(io, socket).getEventObject();
                sock.on(e.eventName, e.eventCb);
                return sock;
            }, socket);

            socket.on("sendEstimate", (estimate, acknowledgeFn) => {
                const usersRoom = UserHandler.getUserBySocketId(socket.id)?.room;

                if (usersRoom) {
                    UserHandler.changeUserEstimate(socket.id, estimate);
                    UserHandler.broadcastNewEstimates(io, usersRoom)
                        ?
                        acknowledgeFn("estimates-update-successful")
                        :
                        acknowledgeFn("estimates-update-failed");
                } else {
                    acknowledgeFn("user-has-no-room");
                }
            });

            socket.on("clickExpand", (isExpanded, acknowledgeFn) => {
                const usersRoom = UserHandler.getUserBySocketId(socket.id)?.room;
                if (usersRoom) {
                    UserHandler.broadcastExpandChange(io, usersRoom, isExpanded)
                        ?
                        acknowledgeFn("expand-update-successful")
                        :
                        acknowledgeFn("expand-update-failed");
                } else {
                    acknowledgeFn("user-has-no-room");
                }
            });

            socket.on("disconnect", () => {
                const room = UserHandler.getUserBySocketId(socket.id)?.room as string;

                if (UserHandler.removeUserFromLocalStore(socket.id)) {
                    socket.disconnect(true);
                    UserHandler.broadcastNewEstimates(io, room);
                    console.log("User has left room");
                }

            });
        });
    }
}

new Index();
