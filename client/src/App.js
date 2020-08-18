import React, { useState } from 'react';
import { Auth } from "aws-amplify";

import { Account, AuthContext } from './components/Accounts/CognitoProvider';

import PrivateRoute from './commonComponents/PrivateRoute';
import NavBar from './components/NavBar/NavBar';

import HandleSessions from './components/Sessions/HandleSessions';
import HandleScrumPoker from './components/ScrumPoker/HandleScrumPoker';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  Auth.currentSession().then(e => {
    userHasAuthenticated(true);
  });
  
  return (<div>
    <Account>
      <AuthContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <NavBar />
        <Router>
         <Route path='/' exact component={HandleSessions} />
         <PrivateRoute path='/scrum-poker' component={HandleScrumPoker} isAuthenticated={isAuthenticated}/>
        </Router>
      </AuthContext.Provider>
    </Account>
  </div>
  )
}

export default App;