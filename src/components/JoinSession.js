import React, { useState, useContext } from 'react';
import { AccountContext } from './Accounts';

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
            <form onSubmit={onSubmit}>
                <input
                    value={sessionName}
                    onChange={event => setSessionName(event.target.value)}
                />
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type='submit'>Join</button>
            </form>
        </div>
    )
}

export default JoinSession;