import IUser from "../interfaces/IUser";
import socketio, { Socket } from "socket.io";

/**
 * A static in memory user store & handler
 * Tracks
 *
 * @class
 */
export default class UserHandler {
    /**
     * @property {number} _USER_CAP : The cap of in memory users available
     */
    private static _USER_CAP = 100;
    /**
     * @property {IUser[]} _USER_STORE : A capped store of {_USER_CAP} users
     */
    private static _USER_STORE: IUser[] = new Array(UserHandler._USER_CAP).fill(null);

    /**
     * Adds a user to a given room
     *
     * @param {socketio.Socket} socket : This users socket
     * @param {string} room : The room to add this users socket to
     */
    public static addUserToRoom(socket: Socket, room: string): void {
        socket.join(room);
    }

    /**
     * Broadcasts the new estimates to all users in a room
     *
     * @param {socketio.Server} io : The socketio server instance
     * @param {string} room : The room to broadcast to
     * @returns {boolean} Whether or not the new estimates emitted successfully
     */
    public static broadcastNewEstimates(io: socketio.Server, room: string): boolean {
        return io.to(room).emit("estimate", {
            room,
            users: UserHandler.getUsersInRoom(room)
        });
    }

    /**
     * Finds the next available index
     * @returns The next available the index, if the index is -1, the store is full
     */
    private getNextAvailableIndex<T>(storeLength: number, store: T[]): number {
        for (let i = 0; i < storeLength; i++) {
            if (store[i] === null) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Add a user to the _USER_STORE if a given index is available
     *
     * //users_name = users_name.trim().toLowerCase();
        room = room.trim().toLowerCase();
     * @param param0
     */
    public static addUserToLocalStore({ id, users_name, room, estimate }: any): IUser {
        users_name = users_name.trim().toLowerCase();
        room = room.trim().toLowerCase();

        const existingUser = UserHandler._USER_STORE.find(u => u?.room === room && u?.users_name === users_name);

        const user: IUser = { id, users_name, room, estimate };
        console.log(user, "<-- userrr");
        UserHandler._USER_STORE.push(user);
        // console.log("---------USER-ADDED--------",users);
        return user;
    }

    public static changeUserEstimate( id: any, number: any ) {
        console.log("USERS ID AND NUMBER", id, number);
        UserHandler._USER_STORE = UserHandler._USER_STORE.map(user => {
            if(user?.id === id) {
               return {
                 ...user,
                 number,
               };
            }
            return user;
          });
        // console.log("---------USER-CHANGE_ESTIMATE--------",users);
        return UserHandler._USER_STORE.filter(u => u !== null);
    }

    public static removeUser(id: any) {
        const index = UserHandler._USER_STORE.findIndex(user => user?.id === id);
        // console.log('removeUser function', users.splice(index, 1)[0])
        if (index !== -1) {
            const user = UserHandler._USER_STORE.splice(index, 1)[0];
            return user;
        }
    }

    public static getUser (id: any) {
        const user = UserHandler._USER_STORE.find(user => user?.id === id);
        // console.log("-----------GET-USER------------", user)
        return user;
    }

    public static getUsersInRoom(room: any) {
        // console.log("--------GET-USERS-IN-ROOM-------", users);
        return UserHandler._USER_STORE.filter(user => user?.room === room);
    }
}
