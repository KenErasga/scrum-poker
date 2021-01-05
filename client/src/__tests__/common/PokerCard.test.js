import React from 'react';
import renderer from 'react-test-renderer';
import PokerCard from '../../common/PokerCard';

describe('PokerCard', () => {

    it('PokerCard renders expanded correctly', () => {
    const tree = renderer
        .create(<PokerCard name='test-name' estimate='5' isExpanded={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });

    it('PokerCard renders not expanded correctly', () => {
        const tree = renderer
            .create(<PokerCard name='test-name' estimate='5' isExpanded={false}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});
