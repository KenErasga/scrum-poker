import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import IUser from "../../../interfaces/IUser";
import User from "../../../dto/User.dto";
import socketio, { Socket } from "socket.io";
import { USER_JOIN } from "../constants/EVENT_CONSTANTS";

/**
 * The primary event for joining a room with a predetermined estimate
 *
 * @class
 * @event Join#constructor:join
 */
export default class UserJoin extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(USER_JOIN, ({ users_name, room, estimate }: IUser, acknowledgeFn) => {
            UserHandler.addUserToLocalStore(new User(
                users_name.trim().toLowerCase(),
                room.trim().toLowerCase(),
                estimate,
                socket.id)
            );
            UserHandler.addUserToRoom(socket, room);
            UserHandler.broadcastNewEstimates(io, room)
                ?
                acknowledgeFn("user-join-successful")
                :
                acknowledgeFn("user-join-failed");
        });
    }
}