import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import socketio, { Socket } from "socket.io";
import { USER_SEND_ESTIMATE } from "../constants/EVENT_CONSTANTS";
import EstimatesSerivce from "../../../services/EstimatesService";

/**
 * Sends a the entire list of new estimates to all users in a given room
 *
 * @class
 * @event UserSendEstimate#constructor:estimate
 */
export default class UserSendEstimate extends SocketIOEvent {
    constructor(io: socketio.Server, socket: Socket) {
        super(USER_SEND_ESTIMATE, (estimate, acknowledgeFn) => {

            if(isNaN(parseInt(estimate)) && estimate !== "N/A") {
                acknowledgeFn("estimates-update-failed:incorrect-data-type");
            } else {
                if (!EstimatesSerivce.evaluateEstimate(parseInt(estimate)) && estimate !== "N/A") {
                    acknowledgeFn("estimates-update-failed:number-out-of-range");
                } else {
                    const usersRoom = UserHandler.getUserBySocketId(socket.id)?.room;

                    if (usersRoom) {
                        UserHandler.changeUserEstimate(socket.id, estimate);
                        UserHandler.broadcastNewEstimates(io, usersRoom)
                            ?
                            acknowledgeFn("estimates-update-successful")
                            :
                            acknowledgeFn("estimates-update-failed");
                    } else {
                        acknowledgeFn("user-has-no-room");
                    }
                }
            }
        });
    }
}
