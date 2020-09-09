import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import socketio, { Socket } from "socket.io";
import { USER_DISCONNECT } from "../constants/EVENT_CONSTANTS";
import User from "../../../dto/User.dto";

/**
 * The primary event for disconnecting from a room with proper cleanup
 *
 *  - As a user may be Scrum Master, this will also reassign a new Scrum Master
 *    as a side functionality.
 *  - In addition to re-assigning, it will remove this user from the local store entirely.
 *
 * @class
 * @event UserDisconnect#constructor:disconnect
 */
export default class UserDisconnect extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(USER_DISCONNECT, () => {
            const user = UserHandler.getUserBySocketId(socket.id);
            const room = user?.room as string;
            const scrumMasterIsLeaving = UserHandler.getUserBySocketId(socket.id)?.scrum_master;

            if (scrumMasterIsLeaving) {
                const socketIdsInRoom = Object.keys(
                    io.nsps["/"].adapter.sids
                ).filter(socketId => socketId !== socket.id);

                if (socketIdsInRoom.length >= 1) {
                    const nextSMLocalStore = UserHandler.getUserBySocketId(socketIdsInRoom.shift() as string);
                    (nextSMLocalStore as User).scrum_master = true;
                    console.log("New Scrum Master assigned, id: ", nextSMLocalStore?.id);
                    io.to(nextSMLocalStore?.id as string).emit("scrum-master-update", true);

                }
            }

            if (UserHandler.removeUserFromLocalStore(socket.id)) {

                socket.disconnect(true);
                UserHandler.broadcastNewEstimates(io, room);
                console.log("User has left room");
            }
        });
    }
}
