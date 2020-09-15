import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import socketio, { Socket } from "socket.io";
import { USERS_RESET_ESTIMATES } from "../constants/EVENT_CONSTANTS";

/**
 * Reset all the users estimates in a room
 *
 * @class
 * @event UsersResetEstimate#constructor:estimate
 */
export default class UsersResetEstimate extends SocketIOEvent {
    constructor(io: socketio.Server, socket: Socket) {
        super(USERS_RESET_ESTIMATES, (reset, acknowledgeFn) => {
                const usersRoom = UserHandler.getUserBySocketId(socket.id)?.room;
                if (usersRoom) {
                    UserHandler.resetUsersEstimate(reset, usersRoom);
                    UserHandler.broadcastResetEstimates(io,usersRoom, reset);
                    UserHandler.broadcastNewEstimates(io, usersRoom)
                        ?
                        acknowledgeFn("estimates-reset-successful")
                        :
                        acknowledgeFn("estimates-reset-failed");
                } else {
                    acknowledgeFn("user-has-no-room");
                };
        });
    }
}
