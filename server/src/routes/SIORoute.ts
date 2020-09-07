import IRoute from "../interfaces/IRoute";
import { Router } from "express";
import PublicController from "../controllers/PublicController";
import ScrumpokerController from "../controllers/ScrumPokerController";

/**
 * All SIO updates and/or actions primarily route
 */
export default class SIORoute implements IRoute {
    /**
     * Router instance
     */
    public readonly ROUTER: Router = Router();
    /**
     * Resource location
     */
    public readonly RESOURCE_LOC: string = "/sio";

    /**
     * Middleware & controller setup
     */
    constructor() {
        this.ROUTER.get(this.RESOURCE_LOC + "/scrum-poker/get-users", ScrumpokerController.getUsers);
    }
}
