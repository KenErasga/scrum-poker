import React from 'react';
import renderer from 'react-test-renderer';
import ButtonSubmit from '../../common/ButtonSubmit';

it('ButtonSubmit renders correctly', () => {
  const tree = renderer
    .create(<ButtonSubmit description='test-description'></ButtonSubmit>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});