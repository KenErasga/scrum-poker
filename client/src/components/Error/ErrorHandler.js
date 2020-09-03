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
        if (errorMessage === "Username cannot be empty") {
            setIsError(true);
            setErrorMessage('Room Name cannot be empty');
        }
    };

    return (
        <ErrorHandlerContext.Provider value={{ socketError, errorMessage, setErrorMessage, isError, setIsError, disconnectError }}>
            {props.children}
        </ErrorHandlerContext.Provider>
    )
}

const useErrorHandler = () => useContext(ErrorHandlerContext);

export { ErrorHandler, useErrorHandler }