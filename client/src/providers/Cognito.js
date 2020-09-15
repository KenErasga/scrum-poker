import { Auth } from 'aws-amplify'
import React, { createContext } from 'react'
const AWS = require('aws-sdk');
// import {AmazonCognitoIdentity} from 'amazon-cognito-identity-js'
const AccountContext = createContext();

const AuthContext = createContext();

const deleteUser = async (room) => {
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_COGNITO_REGION,
    });
    
    const cognito = new AWS.CognitoIdentityServiceProvider();

    try {
        const test = await cognito.adminDeleteUser({
            UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
            Username: room,
        }).promise();
    } catch (error) {
        console.log(error.message);
        throw error
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

const globalSignOut = async () => {
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log(error, 'working not');
        // throw error
    }
} 


const Account = props => {
    return (
        <AccountContext.Provider value={{
            signIn,
            signUp,
            logout,
            globalSignOut,
            deleteUser
        }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext, AuthContext }