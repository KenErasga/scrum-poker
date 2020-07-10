import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from './Accounts/Accounts';
import ChangePassword from './ChangePassword';

const Settings = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { getSession } = useContext(AccountContext);

    useEffect( () => {
         getSession().then(() => {
            setLoggedIn(true)
        });
    });

    return (
        <div>
            {loggedIn &&
                <>
                    <h1>Settings</h1>
                    <ChangePassword></ChangePassword>
                </>
            }
        </div>
    );
};

export default Settings;