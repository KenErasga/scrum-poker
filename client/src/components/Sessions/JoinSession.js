import React, { useState, useContext } from 'react';
import { AccountContext } from '../Accounts/Accounts';
import { Box } from '@material-ui/core'
import FormInput from '../../commonComponents/FormInput';
import ButtonSubmit from '../../commonComponents/ButtonSubmit';

const JoinSession = () => {
    const [sessionName, setSessionName] = useState('')
    const [password, setPassword] = useState('');

    const { authenticate } = useContext(AccountContext);

    const onSubmit = async (event) => {
        event.preventDefault();

        await authenticate(sessionName, password)
            .then(data => {
                console.log('Logged in!', data);
            })
            .catch(err => {
                console.error('Failed to login', err)
            });
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "70%" }} onSubmit={onSubmit}>
                    <h4>Join a session</h4>
                    {FormInput({ InputLabel: 'Session Name', type: '', value: sessionName, handleOnChange: setSessionName })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'Join' })}
                </form>
            </Box>
        </div>
    )
}

export default JoinSession;