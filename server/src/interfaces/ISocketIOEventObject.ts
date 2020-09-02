/**
 * Implements a socket.io event object (to be used in the register reducer):
 *
 *  @interface ISocketIOEventObject
 *  @property {string} eventName : The event name to register with socket.io
 *  @property {(...args: Object[]) => void} eventCb : The call back to be **associated** with said event
 */
export default interface ISocketIOEventObject {
    eventName: string;
    eventCb: (...args: object[]) => void;
}
