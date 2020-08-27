import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify'
import { Account, AuthContext } from './providers/Cognito/Cognito';
import PrivateRoute from './commonComponents/PrivateRoute';

import NavBar from './components/NavBar/NavBar';
import HandleRooms from './components/Rooms/HandleRooms';
import HandleScrumPoker from './components/ScrumPoker/ScrumPoker';
import { ErrorHandler } from './components/Error/ErrorHandler'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
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
      {!isAuthenticating && <Account>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <NavBar />
          <Router>
            <ErrorHandler>
              <Route path='/' exact component={HandleRooms} />
              <PrivateRoute path='/scrum-poker' component={HandleScrumPoker} isAuthenticated={isAuthenticated} />
            </ErrorHandler>
          </Router>
        </AuthContext.Provider>
      </Account>}
    </div>
  )
}

export default App;