import React from 'react';
import JoinCreateRoom from '../../../components/Rooms/JoinCreateRoom';
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

describe('JoinCreateRoom', () => {

    it('JoinCreateRoom renders correctly', () => {
        const tree = render(<JoinCreateRoom />);
        expect(tree).toMatchSnapshot();
    });

    it('JoinCreateRoom fireEvent correctly', async () => {
        const tree = render(<JoinCreateRoom />);
        // const inputName = tree.getByLabelText('Name');
        // const submit = tree.getByLabelText('create');
        // const test = await tree.findAllByLabelText()
        // console.log(screen.getByLabelText('Name'));
        // fireEvent.change(screen.getByLabelText('Name'), { target: { value: '23' } })
        // screen.debug();
        expect(tree).toMatchSnapshot();
    });

});