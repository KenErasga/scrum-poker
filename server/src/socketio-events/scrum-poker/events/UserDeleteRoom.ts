import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import socketio, { Socket } from "socket.io";
import { USER_DELETE_ROOM } from "../constants/EVENT_CONSTANTS";

/**
 * This event is emited when scrum master deletes the room and kicks everyone out in the room
 *
 *
 * @class
 * @event UserDeleteRoom#constructor:deleteRoom
 */
export default class UserDeleteRoom extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(USER_DELETE_ROOM, (test, acknowledgeFn) => {
                const usersRoom = UserHandler.getUserBySocketId(socket.id)?.room as string;
                if (usersRoom) {
                    UserHandler.broadcastDeleteRoom(io, usersRoom, test) ?
                    acknowledgeFn("user-delete-room-successful")
                    :
                    acknowledgeFn("user-delete-room-failed");
                };
        });
    }
}