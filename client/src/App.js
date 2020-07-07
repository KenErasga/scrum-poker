import React from 'react';
import { Account } from './components/Accounts/Accounts';
import NavBar from './components/NavBar/NavBar';

import HandleSessions from './components/Sessions/HandleSessions';
import HandleScrumPoker from './components/ScrumPoker/HandleScrumPoker'
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
    <Account>
      <NavBar></NavBar>
      <Router>
        <Route path='/' exact component={HandleSessions}></Route>
        <Route path='/ScrumPoker' component={HandleSessions}></Route>
        {/* <Route path='/' exact component={Join}></Route>
        <Route path='/chat' exact component={Chat}></Route> */}
        
      </Router>
    </Account>
  )

export default App;
