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
        console.error(e.message)
        throw new Error(e)
    }
};

const signIn = async (room, password) => {
    try {
        await Auth.signIn(room, password);
    } catch (e) {
        console.error(e.message)
        throw new Error(e)
    }
};

const logout = async () => {
    try {
        await Auth.signOut();
        console.log("logout");
    } catch (e) {
        console.error(e.message)
        throw new Error(e)
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