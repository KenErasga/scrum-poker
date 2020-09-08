import { Request, Response } from "express";
import UserHandler from "../handlers/UserHandler";
import IUser from "../interfaces/IUser";

/**
 * Handles all scrum-poker related actions
 *
 * @static
 */
export default class ScrumPokerController {
    /**
     * Gets all [by default] users in the current local store for a given SIO room
     * - Must pass `room` query param.
     * - Can optionally pass query param `id` to get a specific user.
     *
     * @param {Request} req : Express Request object
     * @param {Response} res : Express Response object
     */
    public static getUsers(req: Request, res: Response): void {
        const users: (IUser | null)[] = UserHandler.getUsersInRoom(req.query?.room as string);

        if (req.query.id) {
            res.send(users.find((user) => {
                return user?.id === req.query.id;
            }));
        } else {
            res.send(users);
        }
    }

    /**
     * Checks if a given user based on their socket `id` is a scrum master.
     * - Must pass `room` query param.
     * - Must pass `id` query param.
     *
     * @param {Request} req : Express Request object
     * @param {Response} res : Express Response object
     */
    public static checkForScrumMaster(req: Request, res: Response): void {
        const users: (IUser | null)[] = UserHandler.getUsersInRoom(req.query?.room as string);
        console.log("scrum master endpoint hit");
        users.find((user) => user?.scrum_master === true)?.id === req.query.id
            ?
                res.send({ scrum_master: true })
            :
                res.send({ scrum_master: false });
    }
}
