import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { Box } from '@material-ui/core'
import FormInput from '../../commonComponents/FormInput';
import ButtonSubmit from '../../commonComponents/ButtonSubmit';
import { AccountContext, AuthContext } from '../Accounts/CognitoProvider';
const CreateSession = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, signUp } = useContext(AccountContext);
    const { userHasAuthenticated } = useContext(AuthContext);

    const history = useHistory();
    
    const onSubmit = async (event) => {
        event.preventDefault();

        signUp(room, password);
        signIn(room, password);
        userHasAuthenticated(true);

        history.push(`/scrum-poker?name=${name}&room=${room}`);
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "center", margin: 10, padding: 10 }} >
                <form style={{ width: "70%" }} onSubmit={onSubmit}>
                    <h4>Create a session</h4>
                    {FormInput({ InputLabel: 'Name', type: '', value: name, handleOnChange: setName })}
                    {FormInput({ InputLabel: 'Session Name', type: '', value: room, handleOnChange: setRoom })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'create' })}
                </form>
            </Box>
        </div>
    )
}

export default CreateSession;