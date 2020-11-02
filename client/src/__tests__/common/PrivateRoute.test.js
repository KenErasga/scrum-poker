import React from 'react';
import renderer from 'react-test-renderer';
import PrivateRoute from '../../common/PrivateRoute';
import {Router, MemoryRouter} from 'react-router-dom';

jest.mock('../../components/Error/ErrorHandler.js', () => ({
    useErrorHandler: () => ({
        isError: false,
        errorMessage: 'test error message',
        setIsError: jest.fn(),
        setErrorMessage: jest.fn(),
        socketError: 'socket error',
        disconnectError: 'disconnect error'
    })
})); 

describe('PrivateRoute', () => {

    it('PrivateRoute renders isAuthenticated=true correctly', () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <PrivateRoute path='/test' component={() => <h2>test1</h2>} isAuthenticated={true}/>
            </MemoryRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
    });

    it('PrivateRoute renders when isAuthenticated=false correctly', () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <PrivateRoute path='/t' component={() => <h2>test2</h2>} isAuthenticated={false}/>
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
        });
    
});
