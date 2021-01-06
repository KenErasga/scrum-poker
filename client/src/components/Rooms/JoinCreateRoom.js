import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, ButtonGroup } from '@material-ui/core'
import { useAccountContext, useAuthContext } from '../../providers/Cognito';
import { FormInput, ButtonSubmit } from '../../common';
import { useErrorHandler } from '../Error/ErrorHandler';

const JoinCreateRoom = ({ listJoin, listJoinRoomName }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('');

    const { signIn, signUp } = useAccountContext();
    const { setIsAuthenticated } = useAuthContext();

    const { setIsError, setErrorMessage, validationError } = useErrorHandler();

    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(action)

        if (name === "") {
            setErrorMessage("Your name cannot be empty");
            setIsError(true);
        } else if (action === "create") {
            signUp(room, password).then(() => {
                signIn(room, password);
                setIsAuthenticated(true);
                history.push(`/scrum-poker?name=${name}&room=${room}`);
            }).catch(error => {
                validationError(error.message);
            })
        } else if (action === "join") {
            signIn(room, password).then(() => {
                setIsAuthenticated(true);
                history.push(`/scrum-poker?name=${name}&room=${room}`);
            }).catch(error => {
                validationError(error.message);
            });
        }
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "100%" }} onSubmit={event => onSubmit(event)}>
                    {listJoin ? <Typography variant="h6" component="h6" gutterBottom>Joining room: {listJoinRoomName}</Typography> : <Typography variant="h6" component="h6" gutterBottom>Create or Join a room</Typography>}
                    {FormInput({ InputLabel: 'Name', type: '', value: name, handleOnChange: setName })}
                    {listJoin ? null : FormInput({ InputLabel: 'Room Name', type: '', value: room, handleOnChange: setRoom })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" fullWidth>
                        {ButtonSubmit({ description: 'create', setAction })}
                        {ButtonSubmit({ description: 'join', setAction })}
                    </ButtonGroup>
                </form>
            </Box>
        </div>
    )
}

export default JoinCreateRoom;