# The HTTP server architecture explained:
You'll see a main entry point, {Index.ts}.
In here you'll further see an iterated list of modules, known as 'routes'.
This iterated module contains all the potential registered routes within the app,
and each route points to a controller, which handles successful routed logic.
Finally, you will see middleware is performed in the route, NOT the controller.

# The Socket.IO architecture explained:
We have each socket event wrapped in an abstract class {SocketIOEvent}, {SocketIOEvent}
implements a single interface {ISocketIOEvent}, this interface returns a specific object
designed to be reduced from the abstract method of {SocketIOEvent}, you'll find the interface
for this return object in {ISocketIOEventObject}. Finally, in {Index[main]}, you will see
we register the events via reducing them into the *connected* clients socket.