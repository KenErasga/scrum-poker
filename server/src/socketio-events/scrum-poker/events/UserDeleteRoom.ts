import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import IUser from "../../../interfaces/IUser";
import User from "../../../dto/User.dto";
import socketio, { Socket } from "socket.io";
import { USER_DELETE_ROOM } from "../constants/EVENT_CONSTANTS";

/**
 * The primary event for joining a room with a predetermined estimate
 *
 * Adds user to the room, if the room didn't exist prior, we dedicate
 * them as scrum master when adding them into the local store.
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