import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from '../../common/NavBar';

describe('NavBar', () => {
    it('NavBar renders correctly', () => {
    
    const tree = renderer
        .create(<NavBar />)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });
});
