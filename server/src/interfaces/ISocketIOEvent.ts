import ISocketIOEventObject from "./ISocketIOEventObject";

/**
 * The default interface for a socket.io event class, only inherited by the abstract
 * which will be extended for custom IO events
 *
 * @interface ISocketIOEvent
 * @param {() => ISocketIOEvent} getEventObject : Returns the *ISocketIOEventObject* for use in event registering.
 */
export default interface ISocketIOEvent {
    getEventObject: () => ISocketIOEventObject;
}

