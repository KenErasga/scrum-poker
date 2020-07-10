import React from 'react'
import CreateSession from '../Sessions/CreateSession';
import JoinSession from '../Sessions/JoinSession';
import { Paper, Grid, Container, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const HandleSessions = () => {
  const classes = useStyles();
    return (
        <Container className={classes.root} component="main" maxWidth="sm">
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
        </Grid>
      </Container>
    );
};

export default HandleSessions;