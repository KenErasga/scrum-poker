import React from 'react';
import { FormControl, InputLabel, Input} from '@material-ui/core'

const FormInput = props => {
    return (
        <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="component-simple">{`${props.InputLabel}`}</InputLabel>
            <Input type={props.type} value={props.value} onChange={e => props.handleOnChange(e.target.value)} aria-label={`${props.InputLabel}-input`}/>
        </FormControl>
    );
};

export default FormInput;