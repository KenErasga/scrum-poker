import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import socketio, { Socket } from "socket.io";
import { USER_VIEW_ESTIMATES  } from "../constants/EVENT_CONSTANTS";

/**
 * The primary event for joining a room with a predetermined estimate
 *
 * @class
 * @event UserViewEstimates#constructor:clickExpand
 */
export default class UserViewEstimates extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(USER_VIEW_ESTIMATES, (isExpanded, acknowledgeFn) => {
            const usersRoom = UserHandler.getUserBySocketId(socket.id)?.room;

            if (usersRoom) {
                UserHandler.broadcastExpandChange(io, usersRoom, isExpanded)
                    ?
                    acknowledgeFn("expand-update-successful")
                    :
                    acknowledgeFn("expand-update-failed");
            } else {
                acknowledgeFn("user-has-no-room");
            }
        });
    }
}
