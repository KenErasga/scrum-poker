import { Auth } from 'aws-amplify'
import React, { createContext } from 'react'

const AccountContext = createContext();

const AuthContext = createContext();

const signUp = async (room, password) => {
    try {
        return await Auth.signUp({
            username: room,
            password: password
        })
    } catch (e) {
        throw e
    }
};

const signIn = async (room, password) => {
    try {
        return await Auth.signIn(room, password);
    } catch (e) {
        throw e
    }
};

const logout = async () => {
    try {
        return await Auth.signOut();
    } catch (e) {
        throw e
    }
};

const Account = props => {
    return (
        <AccountContext.Provider value={{
            signIn,
            signUp,
            logout,
        }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext, AuthContext }