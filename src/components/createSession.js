import React, { useState } from 'react';
import UserPool from '../userPool';

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
            <form onSubmit={onSubmit}>
            <input 
                value={sessionName} 
                onChange={event => setSessionName(event.target.value)}
            />
            <input 
                value={password} 
                onChange={event => setPassword(event.target.value)}
            />      
            <button type='submit'>Create</button>      
            </form>
        </div>
    )
}

export default CreateSession;