import React from 'react';
import renderer from 'react-test-renderer';
import FormInput from '../../common/FormInput';

describe('FromInput', () => {
    it('FormInput renders correctly', () => {
    const tree = renderer
        .create(<FormInput InputLabel='test-label' handleOnChange={(e) => e} type='test' value='value'/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });
});
