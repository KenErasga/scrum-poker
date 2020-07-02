import React, { useState, useContext } from 'react';
import { AccountContext } from './Accounts/Accounts';

const ChangePassword = () => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const { getSession } = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession().then(session => {
            console.log('Session', session)
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input
                    value={newPassword}
                    onChange={event => setNewPassword(event.target.value)}
                />
                <button type='submit'>Change password</button>
            </form>
        </div>
    );
};

export default ChangePassword;