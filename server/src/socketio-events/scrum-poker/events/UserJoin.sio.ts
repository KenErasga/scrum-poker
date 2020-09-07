import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import IUser from "../../../interfaces/IUser";
import User from "../../../dto/User.dto";
import socketio, { Socket } from "socket.io";
import { USER_JOIN } from "../constants/EVENT_CONSTANTS";

/**
 * The primary event for joining a room with a predetermined estimate
 *
 * Adds user to the room, if the room didn't exist prior, we dedicate
 * them as scrum master when adding them into the local store.
 *
 * @class
 * @event Join#constructor:join
 */
export default class UserJoin extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(USER_JOIN, ({ users_name, room, estimate }: IUser, acknowledgeFn) => {
            if (users_name && room && estimate) {
                /* We could pass a the method ref here (addUserToLocalStore), but to keep it simple? No need. */
                /* If we face async issues, we'll have to however. */
                const roomExistedPrior = UserHandler.addUserToRoom(socket, room, io);
                /**
                 * Pass room exists to our local store creation, this will determine if they're
                 * SM or not.
                 */
                UserHandler.addUserToLocalStore(new User(
                    users_name.trim().toLowerCase(),
                    room.trim().toLowerCase(),
                    estimate,
                    !roomExistedPrior,
                    socket.id),
                );
                UserHandler.broadcastNewEstimates(io, room)
                    ?
                    acknowledgeFn("user-join-successful")
                    :
                    acknowledgeFn("user-join-failed");
            } else {
                acknowledgeFn("user-join-failed");
            }
        });
    }
}
