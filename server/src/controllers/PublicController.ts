import { Request, Response } from "express";
import fs from "fs";
import path from "path";
/**
 * PUublic route controller
 *
 * @static
 * @author ale8k, KenErasga
 */
export default class PublicController {
    /**
     * @property {todo} currentHealth : The {stats} object given by node-memwatch, is updated based on event.
     */
    private static currentHealth: object = { healthy: true };

    /**
     * Simple generic health check that returns Health or Unhealth based on memory.
     *
     * @todo Install node-memwatch, and have the events cache the and update the stats
     *       for what will be responded here.
     *
     * @param {Request} req : Express Request object
     * @param {Response} res : Express Response object
     */
    public static getHealthCheck(req: Request, res: Response): void {
        res.send(`Server stats: ${JSON.stringify(PublicController.currentHealth)}`);
    }

    /**
     * Serves the built frontend
     */
    public static serveFrontEnd(req: Request, res: Response): void {
        res.sendFile(path.join(__dirname, "../../dist/build/index.html"));
    }
}
