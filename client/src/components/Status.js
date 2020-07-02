import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts/Accounts';
import {Typography, Button, Box} from '@material-ui/core';
const Status = () => {
    const [status, setStatus] = useState(false)

    const { getSession, logout } = useContext(AccountContext)

    useEffect(() => {
        getSession().then(() => {
            setStatus(true);
        })
    }, []);

    return (
        <div>
            {status ? (
                <Typography  variant="h4" component="h4">
                    You are in a session.
                    <Button onClick={logout} variant="contained">Logout</Button>
                    </Typography>
            ) : (
                <Typography variant="h4" component="h4">Please join session below</Typography>)}
        </div>
    )
};

export default Status;