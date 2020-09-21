import { Auth } from 'aws-amplify'
import React, { createContext } from 'react'
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
        const test = await CISP.adminDeleteUser({
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
const listCognitoUsers = () => {
    return new Promise((res, rej) => {
        CISP.listUsers({
            UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID
        }, (err, data) => {
            err ? rej(err) : res(data);
        });
    });
}

const CognitoAccess = ({ children }) => (
    <CognitoAccessContext.Provider value={{
        listCognitoUsers
    }}>
        {children}
    </CognitoAccessContext.Provider>
);



export { Account, AccountContext, AuthContext, CognitoAccess, CognitoAccessContext }