import express, { Express } from "express";
import socketio, { Socket } from "socket.io";
import http, { Server } from "http";
import routes from "./routes";
import { addUser, changeUserEstimate, removeUser, getUser, getUsersInRoom } from "./User";
import IUser from "./socketio-events/scrum-poker/interfaces/IUser";

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

            /**
             * @param {string}
             * @param {Function<any[], Function>} : Callback is an event to emit back to the frontend to run the 'ack' function
             */
            socket.on("join", ({ users_name, room, estimate }: IUser, callback) => {
                console.log("Session joined");
                const { error, user } = addUser({ id: socket.id, users_name, room, estimate });

                socket.join((user as any).room);

                io.to((user as any).room).emit("estimate", { room: (user as any).room, users: getUsersInRoom((user as any).room) });

                callback();
            });


            socket.on("sendEstimate", (estimate, callback) => {
                const user = getUser(socket.id);

                const usersInRoom = changeUserEstimate(socket.id, estimate);

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
