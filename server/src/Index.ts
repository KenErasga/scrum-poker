import express, { Express } from "express";
import socketio, { Socket } from "socket.io";
import http, { Server } from "http";
import routes from "./routes";
import { addUser, changeUserEstimate, removeUser, getUser, getUsersInRoom } from "./User";
import IUser from "./interfaces/IUser";
import UserHandler from "./handlers/UserHandler";

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
             * @param {Function<any[], Function>} acknowledgeFn : is an event to emit back to the frontend to run the 'ack' function
             */
            socket.on("join", ({ users_name, room, estimate }: IUser, acknowledgeFn) => {
                UserHandler.addUserToLocalStore({ id: socket.id, users_name, room, estimate });
                UserHandler.addUserToRoom(socket, room);
                UserHandler.broadcastNewEstimates(io, room)
                    ?
                    acknowledgeFn("estimates-updated")
                    :
                    acknowledgeFn("estimates-failed-to-update");
            });


            socket.on("sendEstimate", (number, callback) => {
                const user = UserHandler.getUser(socket.id) as IUser;

                const usersInRoom = UserHandler.changeUserEstimate(socket.id, number);

                io.to(user.room as string).emit("estimate", { room: user.room, users: usersInRoom });

                callback();
            });

            socket.on("clickExpand", (isExpanded, callback) => {
                const user = UserHandler.getUser(socket.id) as IUser;

                const expanded = isExpanded;

                io.to(user.room as string).emit("expand", { room: user.room, expand: expanded });

                callback();
            });

            socket.on("disconnect", () => {

                const user = UserHandler.removeUser(socket.id);

                if (user) {
                    console.log("User has left room");
                    io.to((user as any).room).emit("estimate", { room: (user as any).room, users: UserHandler.getUsersInRoom((user as any).room) });
                }

            });
        });
    }
}

new Index();
