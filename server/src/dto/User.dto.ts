import IUser from "../interfaces/IUser";

/**
 * The generic DTO for a User within scrum-poker
 *
 * @class
 */
export default class User implements IUser {
    public id?: string;
    public users_name: string;
    public room: string;
    public estimate: string;

    constructor(_usersName: string, _room: string, _estimate: string, _id?: string, ) {
        this.id = _id;
        this.users_name = _usersName;
        this.room = _room;
        this.estimate = _estimate;
    }
}
