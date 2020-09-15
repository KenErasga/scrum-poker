import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useErrorHandler } from './ErrorHandler';

export const ErrorAlert = props => {
    const classes = useStyles();

    const { isError, errorMessage, setIsError, setErrorMessage } = useErrorHandler();

    const handleClose = () => {
        setIsError(false);
        setErrorMessage(undefined); 
    };

    return (
        <div className={classes.root}>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error" elevation={6} variant="filled" onClose={handleClose} {...props}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));