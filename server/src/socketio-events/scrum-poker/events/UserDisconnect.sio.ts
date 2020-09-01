import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import socketio, { Socket } from "socket.io";
import { USER_DISCONNECT } from "../constants/EVENT_CONSTANTS";

/**
 * The primary event for disconnecting from a room with proper cleanup
 *
 * @class
 * @event UserDisconnect#constructor:disconnect
 */
export default class UserDisconnect extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(USER_DISCONNECT, () => {
            const room = UserHandler.getUserBySocketId(socket.id)?.room as string;

            if (UserHandler.removeUserFromLocalStore(socket.id)) {
                socket.disconnect(true);
                UserHandler.broadcastNewEstimates(io, room);
                console.log("User has left room");
            }
        });
    }
}
