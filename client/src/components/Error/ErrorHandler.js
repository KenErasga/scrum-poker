import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';

import { Page500 } from './ErrorPages';

const ErrorHandlerContext = createContext();

const ErrorHandler = props => {
    const [errorMessage, setErrorMessage] = useState();

    const history = useHistory();

    useEffect(() => {
        return history.listen(() => setErrorMessage(undefined));
    }, []);

    const renderContent = () => {
        if (errorMessage === "user-join-failed" ||
            errorMessage === "estimates-update-failed" ||
            errorMessage === "user-has-no-room" ||
            errorMessage === "expand-update-failed" ||
            errorMessage === "Error on connection" ||
            errorMessage === 'Error in server'
        ) { 
            return <Page500 />
        };

        return props.children;
    }

    const contextPayload = useMemo(() => (
        { setErrorMessage }), [setErrorMessage]
    );

    return (
        <ErrorHandlerContext.Provider value={contextPayload}>
            {renderContent()}
        </ErrorHandlerContext.Provider>
    )
}

const useErrorHandler = () => useContext(ErrorHandlerContext);

export { ErrorHandler, useErrorHandler }