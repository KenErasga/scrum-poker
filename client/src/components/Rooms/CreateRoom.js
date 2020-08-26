import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core'
import { AccountContext, AuthContext } from '../../providers/Cognito/Cognito';
import { FormInput, ButtonSubmit } from '../../commonComponents';

const CreateRoom = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, signUp } = useContext(AccountContext);
    const { setIsAuthenticated } = useContext(AuthContext);

    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();

        signUp(room, password).then(() => {
            signIn(room, password);
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
                    <h4>Create a room</h4>
                    {FormInput({ InputLabel: 'Name', type: '', value: name, handleOnChange: setName })}
                    {FormInput({ InputLabel: 'Room Name', type: '', value: room, handleOnChange: setRoom })}
                    {FormInput({ InputLabel: 'Password', type: 'password', value: password, handleOnChange: setPassword })}
                    {ButtonSubmit({ description: 'create' })}
                </form>
            </Box>
        </div>
    )
}

export default CreateRoom;