/**
 * Represents a client user implementation:
 *
 * @interface IUser
 * @property {string} id : The users id, denoted by their socket id
 * @property {string} users_name : Their name to display in the client
 * @property {string} room : The socketio room they're associated with
 * @property {string} estimate : Their *current* ticket estimate
 */
export default interface IUser {
    id?: string;
    users_name: string;
    room: string;
    estimate: string;
}
