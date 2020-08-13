import IRoute from "../interfaces/IRoute";
import { Router } from "express";
import PublicController from "../controllers/PublicController";

/**
 * The public tutorial route
 *
 * TODO: Remove IRoute, use Abstract Route instead.
 *
 * @author ale8k, KenErasga
 */
export default class PublicRoute implements IRoute {
    /**
     * Router instance
     */
    public readonly ROUTER: Router = Router();
    /**
     * Resource location
     */
    public readonly RESOURCE_LOC: string = "/public";

    /**
     * Middleware & controller setup
     */
    constructor() {
        this.ROUTER.get(this.RESOURCE_LOC + "/health-check", PublicController.getHealthCheck);
    }
}
