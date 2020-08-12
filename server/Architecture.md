# The server architecture explained:
You'll see a main entry point, {Index.ts}.
In here you'll further see an iterated list of modules, known as 'routes'.
This iterated module contains all the potential registered routes within the app,
and each route points to a controller, which handles successful routed logic.
Finally, you will see middleware is performed in the route, NOT the controller.