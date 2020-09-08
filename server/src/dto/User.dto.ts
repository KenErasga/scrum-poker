 /* tslint:disable:variable-name */

import IUser from "../interfaces/IUser";

/**
 * The generic DTO for a User within scrum-poker
 *
 * @class
 */
export default class User implements IUser {
    public id?: string;
    public scrum_master: boolean;
    public users_name: string;
    public room: string;
    public estimate: string;

    constructor(_usersName: string, _room: string, _estimate: string, scrumMaster: boolean, _id?: string) {
        this.id = _id;
        this.scrum_master = scrumMaster;
        this.users_name = _usersName;
        this.room = _room;
        this.estimate = _estimate;
    }
}
