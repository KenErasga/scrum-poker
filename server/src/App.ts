import express, { Express } from "express";
import cors from "cors";
import socketio, { Socket } from "socket.io";
import http, { Server } from "http";
import routes from "./routes";
import sioEvents from "./socketio-events/scrum-poker/events";
import path from "path";

/**
 * Server entry point
 *
 * @class
 * @author ale8k, KenErasga
 */
export default class App {
    /**
     * @property {number} _PORT : The port to run the server on
     */
    private readonly _PORT: number = 5000;
    /**
     * @property {Express} _APP : Express app instance, note, we're only using this for the RequestListeners
     * -- We technically don't need it...
     */
    private readonly _APP: Express = express();
    /**
     * @property {Server} SERVER : Generic HTTP module server
     */
    public readonly SERVER: Server = http.createServer(this._APP);
    /**
     * @property {socketio.Server} _IO : The socketio websocket instance
     */
    private readonly _IO: socketio.Server = socketio(this.SERVER);

    constructor() {
        console.log("Server constructed");
        this._APP.use(cors());
        this._APP.use(express.static(path.join(__dirname, "../dist/build")));
        this.registerHTTPRoutes();
        this.registerSocketIOEvents(this._IO);
    }

    /**
     * Spins up the server
     */
    public startServer(): void {
        console.log("Attempting to start server...");
        this.SERVER.listen(this._PORT, () => {
            console.log(`Server running on: ${this._PORT}`);
        });
    }

    /**
     * Stops a listening Express instance
     */
    public stopServer(): http.Server {
        return this.SERVER.close(() => {
            console.log("Server shutdown successfully.");
        });
    }

    /**
     * Registers all routes {RequestHandler/express.Router} within the Express app instance
     */
    private registerHTTPRoutes(): void {
        routes.forEach(route => this._APP.use(new route().ROUTER));
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
        });
    }
}

