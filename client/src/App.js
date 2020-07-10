import React from 'react';
import { Account } from './components/Accounts/Accounts';
import NavBar from './components/NavBar/NavBar';

import HandleSessions from './components/Sessions/HandleSessions';
import HandleScrumPoker from './components/ScrumPoker/HandleScrumPoker';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Account>
      <NavBar />
      <Router>
        <Route path='/' exact component={HandleSessions} />
        <Route path='/scrum-poker' exact component={HandleScrumPoker} />
      </Router>
    </Account>
  )
}

export default App;