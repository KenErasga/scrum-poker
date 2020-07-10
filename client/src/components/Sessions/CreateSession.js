import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import UserPool from '../../userPool';
import { Box } from '@material-ui/core'
import FormInput from '../../commonComponents/FormInput';
import ButtonSubmit from '../../commonComponents/ButtonSubmit';
import { AccountContext } from '../Accounts/Accounts';

const CreateSession = () => {
    const [name, setName] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [password, setPassword] = useState('');

    const { getSession, authenticate, setLoggedIn } = useContext(AccountContext);

    const history = useHistory();
    const onSubmit = event => {
        event.preventDefault();

        UserPool.signUp(sessionName, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }

            authenticate(sessionName, password)
            .then(async data => {
                console.log('Logged in!', data);
                await getSession().then(() => setLoggedIn(true))
                history.push(`/scrum-poker?name=${name}&room=${sessionName}`);
            })
            .catch(err => {
                console.error('Failed to login', err)
            });
        })
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "70%" }} onSubmit={onSubmit}>
                    <h4>Create a session</h4>
                    {FormInput({ InputLabel: 'Name', type: '', value: name, handleOnChange: setName })}
                    {FormInput({ InputLabel: 'Session Name', type: '', value: sessionName, handleOnChange: setSessionName })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'create', sessionName, name })}
                </form>
            </Box>
        </div>
    )
}

export default CreateSession;