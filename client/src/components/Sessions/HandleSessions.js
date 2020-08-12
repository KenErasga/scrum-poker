import React from 'react'
import CreateSession from '../Sessions/CreateSession';
import JoinSession from '../Sessions/JoinSession';
import { Paper, Grid, Container } from '@material-ui/core';

const HandleSessions = () => (
  <Container component="main" maxWidth="sm">
    <Grid container spacing={3}>
      <Grid item xs={8}>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} variant="outlined">
          <CreateSession></CreateSession>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} variant="outlined">
          <JoinSession></JoinSession>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default HandleSessions;