import React from 'react'

import Status from '../Status';
import Settings from '../Settings';
import CreateSession from '../Sessions/CreateSession';
import JoinSession from '../Sessions/JoinSession';
import { Paper, Grid, Container, Box } from '@material-ui/core';

const HandleSessions = props => {
    return (
        <Container className={props.classes.root} component="main" maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Box
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 20,
              padding: 20
            }}
            fontFamily="Monospace">
            <Status></Status>
            </Box>
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
          <Settings></Settings>
        </Grid>
      </Container>
    );
};

export default HandleSessions;