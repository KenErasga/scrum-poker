import {Auth} from 'aws-amplify'
import React, { createContext, useState } from 'react'

const AccountContext = createContext();
const Account = props => {

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
        await Auth.signOut();
        console.log("logout");
    };  

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

const AuthContext = createContext();

const Authentication = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { Account, AccountContext, Authentication, AuthContext }