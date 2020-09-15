import React from 'react'
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { Paper, Grid, Container } from '@material-ui/core';

const HandleRooms = () => (
  <Container component="main" maxWidth="sm">
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
  </Container>
);

export default HandleRooms;