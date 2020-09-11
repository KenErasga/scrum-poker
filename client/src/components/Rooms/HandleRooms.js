import React from 'react'
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { Paper, Grid, Container } from '@material-ui/core';
import AWS, { CognitoIdentityServiceProvider, Credentials } from "aws-sdk";

const HandleRooms = () => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
    region: process.env.REACT_APP_COGNITO_REGION
  });

  AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });
  
  new CognitoIdentityServiceProvider().listUsers({
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID
  }, (err, data) => {
    console.log("boop.", err, data)
  });

  return (<Container component="main" maxWidth="sm">
    <Grid container spacing={3}>
      <Grid item xs={8}>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} variant="outlined">
          <CreateRoom></CreateRoom>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} variant="outlined">
          <JoinRoom></JoinRoom>
        </Paper>
      </Grid>
    </Grid>
  </Container>)
};

export default HandleRooms;