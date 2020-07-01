import React, { useState } from 'react';
import UserPool from '../userPool';
import { Box } from '@material-ui/core'
import FormInput from '../commonComponents/FormInput';
import ButtonSubmit from '../commonComponents/ButtonSubmit';

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = event => {
        event.preventDefault();

        UserPool.signUp(sessionName, password, [], null, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        })
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "70%" }} onSubmit={onSubmit}>
                    <h4>Create a session</h4>
                    {FormInput({ InputLabel: 'Session Name', type: '', value: sessionName, handleOnChange: setSessionName })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'create' })}
                </form>
            </Box>
        </div>
    )
}

export default CreateSession;