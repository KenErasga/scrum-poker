import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'eu-west-2_xtoZzztSW',
    ClientId: '5djd7456m3lndi20vbtqr7nt5p'
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;