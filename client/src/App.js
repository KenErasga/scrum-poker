import React from 'react';
import { Account } from './components/Accounts/Accounts';
import NavBar from './components/NavBar/NavBar';
import { makeStyles } from '@material-ui/core'

// import HandleSessions from './components/Sessions/HandleSessions';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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

function App() {
  const classes = useStyles();

  return (
    <Account>
      <NavBar></NavBar>
      <Router>
        {/* <Route path='/' exact component={HandleSessions({classes: classes})}></Route>
        <Route path='/ScrumPokerSession' component={HandleSessions}></Route> */}
        <Route path='/' exact component={Join}></Route>
        <Route path='/chat' exact component={Chat}></Route>
        
      </Router>
    </Account>
  );
}

export default App;
