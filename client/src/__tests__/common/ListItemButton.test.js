import React from 'react';
import renderer from 'react-test-renderer';
import ListItemButton from '../../common/ListItemButton';

describe('ListItemButton', () => {
    it('ListItemButton renders correctly', () => {
    
    const tree = renderer
        .create(<ListItemButton description='test' onClick={(e) => e} Icon='test' />)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });
});
