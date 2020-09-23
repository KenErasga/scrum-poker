import IRoute from "../interfaces/IRoute";
import { Router } from "express";
import PublicController from "../controllers/PublicController";

/**
 * Public frontend route
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
    public readonly RESOURCE_LOC: string = "/";

    /**
     * Middleware & controller setup
     */
    constructor() {
        this.ROUTER.get(this.RESOURCE_LOC + "health-check", PublicController.getHealthCheck);
        this.ROUTER.get(this.RESOURCE_LOC + "*", PublicController.serveFrontEnd);
    }
}
