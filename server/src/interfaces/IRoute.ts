import { Router } from "express";

/**
 * Implements a route:
 *  @interface IRoute
 *  @property {Router} ROUTER : Express router instance
 *  @property {string} RESOURCE_LOC : Resource location
 */
export default interface IRoute {
    readonly ROUTER: Router;
    readonly RESOURCE_LOC: string;
}
