import React, { useState, createContext, useContext } from 'react';

const ErrorHandlerContext = createContext();

const ErrorHandler = props => {
    const [errorMessage, setErrorMessage] = useState();
    const [isError, setIsError] = useState();

    const socketError = (errorMessage) => {
        if (errorMessage === "user-join-failed" ||
            errorMessage === "estimates-update-failed" ||
            errorMessage === "user-has-no-room" ||
            errorMessage === "expand-update-failed" ||
            errorMessage === "Error on connection" ||
            errorMessage === 'Error in server' ||
            errorMessage === "Connection Timeout"
        ) {
            setIsError(true);
            setErrorMessage(errorMessage);
        };
    };

    const disconnectError = (error) => {
        console.error(error)
        setIsError(true)
        setErrorMessage('You have been disconnected: Please refresh the page to reconnect');
    };

    const validationError = (errorMessage) => {
        if (errorMessage) {
            setIsError(true);
            switch (errorMessage) {
                case "Username cannot be empty":
                    setErrorMessage('Room Name cannot be empty');
                    break
                case "Incorrect username or password.":
                    setErrorMessage('Incorrect username or password.');
                    break
                case "Custom auth lambda trigger is not configured for the user pool.":
                    setErrorMessage('Incorrect password');
                    break
                case "User already exists":
                    setErrorMessage('Room name already exists');
                    break
                case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
                    setErrorMessage("Your password must have a length of 6 or more");
                    break
                default:
                    setErrorMessage(errorMessage);
            }
        }
    };

    return (
        <ErrorHandlerContext.Provider value={{ socketError, errorMessage, setErrorMessage, isError, setIsError, disconnectError, validationError }}>
            {props.children}
        </ErrorHandlerContext.Provider>
    )
}

const useErrorHandler = () => useContext(ErrorHandlerContext);

export { ErrorHandler, useErrorHandler }