import React from 'react';

import { Button } from '@material-ui/core'

const ButtonSubmit = props => {
    return (
        <Button type='submit' fullWidth
            variant="contained"
            color="primary">{props.description}</Button>
    );
}

export default ButtonSubmit;