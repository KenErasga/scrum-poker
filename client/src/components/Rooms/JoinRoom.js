import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { AccountContext, AuthContext } from '../../providers/Cognito/Cognito';
import { FormInput, ButtonSubmit } from '../../commonComponents/index';

const JoinRoom = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AccountContext);
    const { setIsAuthenticated } = useContext(AuthContext);

    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        signIn(room, password).then(() => {
            setIsAuthenticated(true);
            history.push(`/scrum-poker?name=${name}&room=${room}`);
        }).catch(error => {
            console.error(error)
            alert(error.message);
        })
        
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "70%" }} onSubmit={onSubmit}>
                    <h4>Join a room</h4>
                    {FormInput({ InputLabel: 'Name', type: '', value: name, handleOnChange: setName })}
                    {FormInput({ InputLabel: 'Room Name', type: '', value: room, handleOnChange: setRoom })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'Join' })}
                </form>
            </Box>
        </div>
    )
}

export default JoinRoom;