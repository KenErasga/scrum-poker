import React, { createContext, useState, useContext } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../userPool';

const AccountContext = createContext();
const AppContext = createContext(null);
function useAppContext() {
    return useContext(AppContext);
};

const Account = props => {

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            user ? user.getSession((err, session) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(session);
                }
            }) : reject();
        });
    };

    const authenticate = async (sessionName, password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: sessionName,
                Pool: UserPool
            });

            const authDetails = new AuthenticationDetails({
                Username: sessionName,
                Password: password
            });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log('onSuccess:', data)
                    resolve(data);
                },
                onFailure: err => {
                    console.error('onFailure:', err);
                    reject(err)
                },
                newPasswordRequired: data => {
                    console.log('newPasswordRequired:', data)
                    resolve(data);
                }
            })
        });
    };

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            console.log("logging out...")
            user.signOut();
        };
    };  

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AccountContext.Provider value={{
            authenticate,
            getSession,
            logout,
            loggedIn,
            setLoggedIn
        }}>
                {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext, AppContext, useAppContext }