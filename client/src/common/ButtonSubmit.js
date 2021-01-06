import React from 'react';

import { Button } from '@material-ui/core';

const ButtonSubmit = ({ description, setAction }) => {
    return (
            <Button
                type='submit'
                color="primary"
                aria-label={description}
                onClick={() => setAction(description)}
            >
                {description}
            </Button>
    );
}

export default ButtonSubmit;