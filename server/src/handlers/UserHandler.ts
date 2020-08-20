import IUser from "../interfaces/IUser";
import socketio, { Socket } from "socket.io";
import User from "../dto/User.dto";

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
     * Finds the next available index for a given nulled array
     *
     * @returns The next available the index, if the index is -1, the store is full
     */
    private static getNextAvailableIndex<T>(storeLength: number, store: T[]): number {
        for (let i = 0; i < storeLength; i++) {
            if (store[i] === null) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Adds a user to the _USER_STORE if a given index is available
     *
     * @param {User} user : The user we wish to add to the local store
     * @returns {User | null} Will return the user back if successful, otherwise null
     */
    public static addUserToLocalStore(user: User): User | null {
        const potentialUser = UserHandler._USER_STORE.find(u => u?.id === user.id);

        if (potentialUser) {
            return null;
        }

        const nextIndex = UserHandler.getNextAvailableIndex(UserHandler._USER_CAP, UserHandler._USER_STORE);
        UserHandler._USER_STORE[nextIndex] = user;
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

    /**
     * Grabs a user from the local store via their socket id.
     *
     * @param {string} id : The users Socket.IO socket Id
     * @returns {User | null} If we cannot find the user, returns null, otherwise returns the user
     */
    public static getUserBySocketId(id: string): User | null {
        const user = UserHandler._USER_STORE.find(u => u?.id === id);
        return user ? user : null;
    }

    public static getUsersInRoom(room: any) {
        // console.log("--------GET-USERS-IN-ROOM-------", users);
        return UserHandler._USER_STORE.filter(user => user?.room === room);
    }
}
