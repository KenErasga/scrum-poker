import SocketIOEvent from "../../../abstracts/SocketIOEvent";
import UserHandler from "../../../handlers/UserHandler";
import User from "../../../dto/User.dto";
import socketio, { Socket } from "socket.io";
import { SCRUM_MASTER_UPDATE } from "../constants/EVENT_CONSTANTS";

/**
 * Updates the current Scrum Master for a given room
 *
 * @class
 * @event UpdateScrumMaster#constructor:update-scrum-master
 */
export default class UpdateScrumMaster extends SocketIOEvent {
    constructor(io: socketio.Server , socket: Socket) {
        super(SCRUM_MASTER_UPDATE, (user: User, acknowledgeFn) => {
            if (user) {
                try {
                    const prevSM = UserHandler.getUserBySocketId(socket.id);
                    const newSM = UserHandler.getUserBySocketId(user.id as string);

                    if (prevSM && newSM) {
                        prevSM.scrum_master = false;
                        newSM.scrum_master = true;

                        if (!prevSM.scrum_master && newSM.scrum_master) {
                            acknowledgeFn("scrum-master-update-successful");
                            io.to(newSM.id as string).emit("scrum-master-update", true);
                            console.log("Scrum Master Updated to user: ", newSM.id);
                        }
                    }
                } catch(e) {
                    console.log("Something went wrong with the scrum-master-update");
                    acknowledgeFn("scrum-master-update-failed");
                }
            } else {
                acknowledgeFn("scrum-master-update-failed:no-user");
            }
        });
    }
}
