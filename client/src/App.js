import React, { useState, useEffect } from 'react';
// import { Account, AppContext } from './components/Accounts/Accounts';
import { Account, AppContext } from './components/Accounts/CognitoProvider';
import { Auth } from "aws-amplify";

import NavBar from './components/NavBar/NavBar';

import HandleSessions from './components/Sessions/HandleSessions';
import HandleScrumPoker from './components/ScrumPoker/HandleScrumPoker';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }
  
  return (<div>
    {!isAuthenticating && <Account>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <NavBar />
        <Router>
          {isAuthenticated ? <Route path='/scrum-poker' exact component={HandleScrumPoker} /> : <Route path='/' exact component={HandleSessions} />}
        </Router>
      </AppContext.Provider>
    </Account>}
  </div>
  )
}

export default App;