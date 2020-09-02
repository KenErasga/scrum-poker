// const dotenv = require("dotenv"); // needs adding...
const tsJest = require("ts-jest/jest-preset");
// dotenv.config();

/**
 * For multiple presets, ...spread them into this final object.
 * Must be a better way, this is pretty disgusting honestly.
 */
module.exports =  {
  ...tsJest,
  globals: {
    name: "Scrum Poker Online Bois",
    testEnvironment: "node",
    reporters: ["default"],
    __SIO_URI__: "localhost:3001",
    __SIO_PORT__: "3001"
  }
};