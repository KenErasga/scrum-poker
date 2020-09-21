import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import User from "../../../dto/User.dto";
import socketio, { Socket } from "socket.io";
import { KICK_USER } from "../constants/EVENT_CONSTANTS";

/**
 * Scrum Master kick a user out of the room
 *
 * @class
 * @event KickUser#constructor:kickUser
 */
export default class KickUser extends SocketIOEvent {
    constructor(io: socketio.Server, socket: Socket) {
        super(KICK_USER, (user: User, acknowledgeFn) => {
            if (user) {
                try {
                    const userKick = UserHandler.getUserBySocketId(user.id as string);
                    if (userKick) {
                        acknowledgeFn("kick-user-successful");
                        io.to(userKick.id as string).emit("user-kick", true);
                    }
                } catch (e) {
                    console.log("Something went wrong with kicking user");
                    acknowledgeFn("kick-user-failed");
                }
            } else {
                acknowledgeFn("kick-user-failed:no-user");
            }
        });
    }
}
