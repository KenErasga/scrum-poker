import React from 'react';
import renderer from 'react-test-renderer';
import DropDownList from '../../common/DropDownList';

it('DropDownList renders correctly', () => {
  const tree = renderer
    .create(<DropDownList estimate='1' numberList={[1,2,3]} setEstimate={(e) => e}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});