import express, { Express } from "express";
import socketio, { Socket } from "socket.io";
import http, { Server } from "http";
import routes from "./routes";
import { addUser, changeUserEstimate, removeUser, getUser, getUsersInRoom } from "./User";

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
     *
     * @param {socketio.Server} io : Our socketio server instance
     */
    private registerSocketIOEvents(io: socketio.Server): void {
        io.on("connection", (socket: Socket) => {
            console.log("connection made.");
            socket.on("join", ({ name, room, number }, callback) => {
                console.log("Session joined");
                const { error, user } = addUser({ id: socket.id, name, room, number });

                if (error) {
                    return callback(error);
                }

                socket.join((user as any).room);

                io.to((user as any).room).emit("estimate", { room: (user as any).room, users: getUsersInRoom((user as any).room) });

                callback();
            });

            socket.on("sendEstimate", (number, callback) => {
                const user = getUser(socket.id);

                const usersInRoom = changeUserEstimate(socket.id, number);

                io.to(user.room).emit("estimate", { room: user.room, users: usersInRoom });

                callback();
            });

            socket.on("clickExpand", (isExpanded, callback) => {
                const user = getUser(socket.id);

                const expanded = isExpanded;

                io.to(user.room).emit("expand", { room: user.room, expand: expanded });

                callback();
            });

            socket.on("disconnect", () => {

                const user = removeUser(socket.id);

                if (user) {
                    console.log("User has left room");
                    io.to((user as any).room).emit("estimate", { room: (user as any).room, users: getUsersInRoom((user as any).room) });
                }

            });
        });
    }
}

new Index();
