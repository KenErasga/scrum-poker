import React, { useState, useContext } from 'react';
import { AccountContext, useAppContext } from '../Accounts/CognitoProvider';
import { Box } from '@material-ui/core';
import FormInput from '../../commonComponents/FormInput';
import ButtonSubmit from '../../commonComponents/ButtonSubmit';
import { useHistory } from 'react-router-dom';
const JoinSession = () => {
    const [name, setName] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [password, setPassword] = useState('');

    const { authenticate } = useContext(AccountContext);
    const { userHasAuthenticated } = useAppContext();

    const history = useHistory();
    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(sessionName, password)

        console.log('Logged in!');
        userHasAuthenticated(true);
        history.push(`/scrum-poker?name=${name}&room=${sessionName}`);
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "70%" }} onSubmit={onSubmit}>
                    <h4>Join a session</h4>
                    {FormInput({ InputLabel: 'Name', type: '', value: name, handleOnChange: setName })}
                    {FormInput({ InputLabel: 'Session Name', type: '', value: sessionName, handleOnChange: setSessionName })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'Join' })}
                </form>
            </Box>
        </div>
    )
}

export default JoinSession;