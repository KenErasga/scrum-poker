import React from 'react';

import { Button } from '@material-ui/core';

const ButtonSubmit = ({ description }) => {
    return (
            <Button
                type='submit' fullWidth
                variant="contained"
                color="primary"
                >
                    {description}
            </Button>
    );
}

export default ButtonSubmit;