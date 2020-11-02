import React from 'react';
import CreateRoom from '../../../components/Rooms/CreateRoom';
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock('../../../components/Error/ErrorHandler.js', () => ({
    useErrorHandler: () => ({
        isError: false,
        errorMessage: 'test error message',
        setIsError: jest.fn(),
        setErrorMessage: jest.fn(),
        validationError: jest.fn()
    })
}));

jest.mock('../../../providers/Cognito.js', () => ({
    useAccountContext: () => ({
        signIn: jest.fn(),
        signUp: jest.fn()
    }),
    useAuthContext: () => ({
        setIsAuthenticated: jest.fn()
    })
}));

describe('CreateRoom', () => {

    it('CreateRoom renders correctly', () => {
        const tree = render(<CreateRoom />);
        expect(tree).toMatchSnapshot();
    });

    it('CreateRoom fireEvent correctly', async () => {
        const tree = render(<CreateRoom />);
        // const inputName = tree.getByLabelText('Name');
        // const submit = tree.getByLabelText('create');
        // const test = await tree.findAllByLabelText()
        // console.log(screen.getByLabelText('Name'));
        // fireEvent.change(screen.getByLabelText('Name'), { target: { value: '23' } })
        // screen.debug();
        expect(tree).toMatchSnapshot();
    });

});