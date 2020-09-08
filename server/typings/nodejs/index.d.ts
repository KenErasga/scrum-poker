/**
 * NodeJS GLOBAL type extension
 * This is used for adding Jest globals,
 * so that our *.unit/int.test.ts can pickup on the globals
 */
declare namespace NodeJS {
    interface Global {
        /** The URI / PORT to use for testing within Jest */
        __SIO_URI__: string;
        __SIO_PORT__: string;
    }
}