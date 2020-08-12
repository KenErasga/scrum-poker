import {Auth} from 'aws-amplify'
import React, { createContext, useState, useContext } from 'react'
import UserPool from '../../userPool';

const AccountContext = createContext();
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

    const signUp = async (sessionName, password) => {
        try {
            return await Auth.signUp({
                username: sessionName,
                password: password
            })
        } catch (e) {
            console.error(e.message)
            throw new Error(e.message)
        }
    };

    const authenticate = async (sessionName, password) => {
        try {
            await Auth.signIn(sessionName, password);
          } catch (e) {
            console.error(e.message)
            throw new Error(e.message)
          }
    };

    const logout = async () => {
        await Auth.signOut();
        console.log("logout");
    };  

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AccountContext.Provider value={{
            authenticate,
            signUp,
            getSession,
            logout,
            loggedIn,
            setLoggedIn
        }}>
                {props.children}
        </AccountContext.Provider>
    );
};

const AppContext = createContext(null);
function useAppContext() {
    return useContext(AppContext);
};

export { Account, AccountContext, AppContext, useAppContext }