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
    private static _USER_STORE: (IUser | null)[] = new Array(UserHandler._USER_CAP).fill(null);

    /**
     * Adds a user to a given room
     *
     * @param {socketio.Socket} socket : This users socket
     * @param {string} room : The room to add this users socket to
     * @returns {boolean} Whether or not the room existed prior to this user joining
     */
    public static addUserToRoom(socket: Socket, room: string, io: socketio.Server): boolean {
        /* Leave the pre-joined room with our socket ID */
        // socket.leave(socket.id);
        // Turns out we need this room to send individual messages to this client... ugh.

        /* Grab remaining rooms as array */
        const rooms = io.nsps["/"].adapter.rooms;

        /* Check if the given room we're about to join *already* exists */
        const roomExists = Object.keys(rooms).includes(room);
        console.log("Does room exist?", roomExists);

        /* We join them either way, doesn't matter */
        socket.join(room, (err) => {
            /**
             * @todo handle the error
             */
        });

        /* We know if the room didn't exist prior to joining, then they're the first */
        return roomExists;
        /* This concludes this process. */
    }

    /**
     * Broadcasts the new estimates to all users in a room
     *
     * @fires UserHandler#broadcastNewEstimates:estimate
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
     * Updates the expands or contracts the estimates view for all connected clients in
     * a given room
     *
     * @fires UserHandler#broadcastExpandChange:expand
     * @param {socketio.Server} io : The socketio server instance
     * @param {string} room : The room to broadcast to
     * @param {boolean} expanded : Whether to contract or expand the estimates
     * @returns {boolean} Whether or not the expansion event emitted successfully
     */
    public static broadcastExpandChange(io: socketio.Server, room: string, expanded: boolean): boolean {
        return io.to(room as string).emit("expand", {
            room,
            expand: expanded
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
     * @param {boolean} firstInRoom : Whether or not this user was the first to join their scrum-poker room
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

    /**
     * Updates a given users *current* estimate
     *
     * @param {string} id : The users id, denoted by their socket id
     * @param {string} estimate : The users *current* estimate
     */
    public static changeUserEstimate(id: string, estimate: string): void {
        const user = UserHandler._USER_STORE[UserHandler._USER_STORE.findIndex(u => u?.id === id)];
        if (user) {
            user.estimate = estimate;
        }
    }

    /**
     * Resets a user back to null in the local store
     *
     * @param {string} id : The users socket id
     * @returns {boolean} Whether or not the user was set to null at their index
     */
    public static removeUserFromLocalStore(id: string): boolean {
        const index = UserHandler._USER_STORE.findIndex(user => user?.id === id);

        if (index !== -1) {
            UserHandler._USER_STORE[index] = null;
            return true;
        } else {
            return false;
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

    /**
     * Gets all user objects in the local store from a given room.
     *
     * @param {string} room : The room we wish to filter users from
     */
    public static getUsersInRoom(room: string) {
        return UserHandler._USER_STORE.filter(user => user?.room === room);
    }
}
