/* tslint:disable:no-any */

import ISocketIOEvent from "../interfaces/ISocketIOEvent";
import ISocketIOEventObject from "../interfaces/ISocketIOEventObject";

/**
 * A general abstract layer of what a registerable socket.io event should look like.
 *
 * @abstract
 * @class
 */
export default abstract class SocketIOEvent implements ISocketIOEvent {
    /**
     * @property {string} eventName : The name of the event we wish to register
     */
    protected eventName: string;
    /**
     * @property {(...args: any[]) => void} eventCallback : The callback to register with this given event
     */
    protected eventCallback: (...args: any[]) => void;

    constructor(eventName: string, eventCallback: (...args: any[]) => void) {
        this.eventName = eventName;
        this.eventCallback = eventCallback;
    }

    /**
     * @function getEventObject : A generic function which should return the inherited eventName
     * and eventCallback members of this abstract class.
     *
     * @returns {ISocketIOEventObject} The event object which will construct the event to be added to SIO.
     */
    public getEventObject(): ISocketIOEventObject {
        return { eventName: this.eventName, eventCb: this.eventCallback };
    }
}
