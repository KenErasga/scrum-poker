import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify'
import { Account, AuthContext, CognitoAccess } from './providers/Cognito';
import PrivateRoute from './common/PrivateRoute';

import { NavBar } from './common/index';
import HandleRooms from './components/Rooms/HandleRooms';
import HandleScrumPoker from './components/ScrumPoker/ScrumPoker';
import { ErrorHandler } from './components/Error/ErrorHandler'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ErrorAlert } from './components/Error/ErrorAlert';

const App = () => {
  console.log("App running in mode: ", process.env.NODE_ENV)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    <div>
      {!isAuthenticating &&
        <Account>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <CognitoAccess>
              <NavBar />
              <Router>
                <ErrorHandler>
                  <Route path='/' exact component={HandleRooms} />
                  <PrivateRoute path='/scrum-poker' component={HandleScrumPoker} isAuthenticated={isAuthenticated} />
                  <ErrorAlert />
                </ErrorHandler>
              </Router>
            </CognitoAccess>
          </AuthContext.Provider>
        </Account>}
    </div>
  )
}

export default App;