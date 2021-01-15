import { Auth } from 'aws-amplify'
import React, { createContext, useContext } from 'react'
import AWS, { CognitoIdentityServiceProvider, Credentials } from "aws-sdk";

/**
 * I wonder if this is the best place to setup our config, perhaps move this?
 */
AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
    region: process.env.REACT_APP_COGNITO_REGION
});

const CISP = new CognitoIdentityServiceProvider();

const AccountContext = createContext();

const AuthContext = createContext();

const deleteUser = async (room) => { 
    try {
        await CISP.adminDeleteUser({
            UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
            Username: room,
        }).promise();
    } catch (e) {
        throw e
    }
};

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
            deleteUser
        }}>
            {props.children}
        </AccountContext.Provider>
    );
};

/* Holds the CognitoIdentityService object with the *correct* region */
const CognitoAccessContext = createContext();

/**
 * Grabs the entire User Pool within Cognito
 */
const listCognitoUsers = async () => {

    try {
        let newData = [];
        await CISP.listUsers({
            UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID
        }).promise().then(data => {
            data.Users.map((u, index) => {
                u.UserCreateDate = Date.parse(u.UserCreateDate);
                u.UserCreateDate = new Date(u.UserCreateDate).toLocaleDateString();
                u.id = index;
                newData.push({id: u.id, Username: u.Username, UserCreateDate: u.UserCreateDate})
            });
        });

        return newData
    } catch (e) {
        throw new Error(e)
    }
}

const CognitoAccess = ({ children }) => (
    <CognitoAccessContext.Provider value={{
        listCognitoUsers
    }}>
        {children}
    </CognitoAccessContext.Provider>
);

const useAccountContext = () => useContext(AccountContext);
const useAuthContext = () => useContext(AuthContext);

export { useAccountContext, useAuthContext, Account, AccountContext, AuthContext, CognitoAccess, CognitoAccessContext }