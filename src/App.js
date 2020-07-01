import React from 'react';
import { Account } from './components/Accounts';
import Status from './components/Status'
import CreateSession from './components/CreateSession';
import JoinSession from './components/JoinSession';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import { Paper, Grid, Container, makeStyles, Box } from '@material-ui/core'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Account>
      <NavBar></NavBar>
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
    </Account>
  );
}

export default App;
