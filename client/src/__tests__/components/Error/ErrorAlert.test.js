import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorAlert} from '../../../components/Error/ErrorAlert';

jest.mock('../../../components/Error/ErrorHandler.js', () => ({
    useErrorHandler: () => ({
        isError: false,
        errorMessage: 'test error message',
        setIsError: jest.fn(),
        setErrorMessage: jest.fn()
    })
})); 

describe('ErrorAlert', () => {

    it('ErrorAlert renders correctly', () => {
    const tree = renderer
        .create(<ErrorAlert props='test' />)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });

});
