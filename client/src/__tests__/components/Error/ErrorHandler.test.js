import React from 'react';
import { ErrorHandler, useErrorHandler } from '../../../components/Error/ErrorHandler';
import { render, screen } from "@testing-library/react";

// jest.mock('../../../components/Error/ErrorHandler.js', () => ({
//     useErrorHandler: () => ({
//         isError: false,
//         errorMessage: 'test error message',
//         setIsError: jest.fn(),
//         setErrorMessage: jest.fn()
//     })
// })); 

describe('ErrorHandler', () => {

    describe('ErrorHandler socketError()', () => {
        it('ErrorHandler on socketError with user-join-failed should set isError=true', () => {
            const testErrorMessage = 'user-join-failed';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        setErrorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
        
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
        it('ErrorHandler on socketError with estimates-update-failed should set isError=true', () => {
            const testErrorMessage = 'estimates-update-failed';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
        it('ErrorHandler on socketError with user-has-no-room should set isError=true', () => {
            const testErrorMessage = 'user-has-no-room';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError} = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
        it('ErrorHandler on socketError with expand-update-failed should set isError=true', () => {
            const testErrorMessage = 'expand-update-failed';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError} = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
        it('ErrorHandler on socketError with Error on connection should set isError=true', () => {
            const testErrorMessage = 'Error on connection';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError} = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
        it('ErrorHandler on socketError with Error on connection should set isError=true', () => {
            const testErrorMessage = 'Error on connection';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError, } = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
        it('ErrorHandler on socketError with Error in server should set isError=true', () => {
            const testErrorMessage = 'Error in server';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError, } = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    
    
        it('ErrorHandler on socketError with Connection Timeout should set isError=true', () => {
            const testErrorMessage = 'Connection Timeout';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError, } = useErrorHandler();
    
                    
                return (
                    <div>
                        <li>{socketError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
        const {getByText} = render(
            <ErrorHandler>
                <TestComponent errorMessage={testErrorMessage}/>
            </ErrorHandler>
        );
    
        expect(getByText(resultIsError)).toBeInTheDocument()
        });
    });
    
    describe('ErrorHandler disconnectError()', () => {
        it('ErrorHandler on disconnectError with Error on connection should set isError=true', () => {
            const testErrorMessage = 'Error on connection';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{disconnectError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
            const {getByText} = render(
                <ErrorHandler>
                    <TestComponent errorMessage={testErrorMessage}/>
                </ErrorHandler>
            );
        
            expect(getByText(resultIsError)).toBeInTheDocument()
        });
    });

    describe('ErrorHandler validationError()', () => {
        it('ErrorHandler on validationError with Username cannot be empty should set isError=true', () => {
            const testErrorMessage = 'Username cannot be empty';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{validationError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
            const {getByText} = render(
                <ErrorHandler>
                    <TestComponent errorMessage={testErrorMessage}/>
                </ErrorHandler>
            );
        
            expect(getByText(resultIsError)).toBeInTheDocument()
        });

        it('ErrorHandler on validationError with Incorrect username or password. should set isError=true', () => {
            const testErrorMessage = 'Incorrect username or password.';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{validationError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
            const {getByText} = render(
                <ErrorHandler>
                    <TestComponent errorMessage={testErrorMessage}/>
                </ErrorHandler>
            );
        
            expect(getByText(resultIsError)).toBeInTheDocument()
        });

        it('ErrorHandler on validationError with Custom auth lambda trigger is not configured for the user pool. should set isError=true', () => {
            const testErrorMessage = 'Custom auth lambda trigger is not configured for the user pool.';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{validationError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
            const {getByText} = render(
                <ErrorHandler>
                    <TestComponent errorMessage={testErrorMessage}/>
                </ErrorHandler>
            );
        
            expect(getByText(resultIsError)).toBeInTheDocument()
        });

        it('ErrorHandler on validationError with User already exists should set isError=true', () => {
            const testErrorMessage = 'User already exists';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{validationError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
            const {getByText} = render(
                <ErrorHandler>
                    <TestComponent errorMessage={testErrorMessage}/>
                </ErrorHandler>
            );
        
            expect(getByText(resultIsError)).toBeInTheDocument()
        });
        
        it('ErrorHandler on validationError with Random Error should set isError=true', () => {
            const testErrorMessage = 'Random Error';
            const resultIsError = 'isError=true';
    
            const TestComponent = props => {
                const { socketError,
                        errorMessage,
                        isError,
                        setIsError,
                        disconnectError,
                        validationError } = useErrorHandler();
    
                return (
                    <div>
                        <li>{validationError(props.errorMessage)}</li>
                        <li>{`isError=${isError}`}</li>
                        <li>{errorMessage}</li>
                    </div>
                    )
            };
    
            const {getByText} = render(
                <ErrorHandler>
                    <TestComponent errorMessage={testErrorMessage}/>
                </ErrorHandler>
            );
        
            expect(getByText(resultIsError)).toBeInTheDocument()
        });

    });
});


